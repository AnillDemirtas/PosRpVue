// Regular expression patterns for testing content-type response headers.
var RE_CONTENT_TYPE_JSON = new RegExp("^application/(x-)?json", "i");
var RE_CONTENT_TYPE_TEXT = new RegExp("^text/", "i");
// Static strings.
var UNEXPECTED_ERROR_MESSAGE =
  "An unexpected error occurred while processing your request.";

export class ApiClient {
  /**
   * I initialize the API client.
   */
  constructor() {
    // Nothing to do at this time. In the future, I could add things like base
    // headers and other configuration defaults. But, I don't need any of that stuff
    // at this time.
  }

  // ---
  // PUBLIC METHODS.
  // ---

  /**
   * I make the API request with the given configuration options.
   *
   * GUARANTEE: All errors produced by this method will have consistent structure, even
   * if they are low-level networking errors. Every Promise rejection is guaranteed to
   * have a "type" and a "message" property.
   */
  async makeRequest(config) {
    // CAUTION: We want the entire contents of this method to be inside the try/catch
    // so that we can guarantee that all errors occurring during this workflow will
    // be caught and transformed into a consistent structure. NOTHING HERE SHOULD
    // throw an error - but, bugs happen and people pass-in malformed parameters and
    // I want the error-handling guarantees in place.
    try {
      // Extract options, with defaults, from config.
      var contentType = config.contentType || null;
      var headers = config.headers || Object.create(null);
      var method = config.method || null;
      var url = config.url || "";
      var params = config.params || Object.create(null);
      var form = config.form || null;
      var json = config.json || null;
      var body = config.body || null;

      // The fetch* variables are the values that we'll actually use to generate
      // the fetch() call. We're going to assign these based on the configuration
      // data that was passed-in.
      var fetchHeaders = this.buildHeaders(headers);
      var fetchMethod = null;
      var fetchUrl = this.mergeParamsIntoUrl(url, params);
      var fetchBody = null;
      var fetchCredentials = "include";

      if (form) {
        // NOTE: For form data posts, we want the browser to build the Content-
        // Type for us so that it puts in both the "multipart/form-data" plus the
        // correct, auto-generated field delimiter.
        delete fetchHeaders["content-type"];
        // ColdFusion will only parse the form data if the method is POST.
        fetchMethod = "post";
        fetchBody = this.buildFormData(form);
      } else if (json) {
        fetchHeaders["content-type"] = contentType || "application/json";
        fetchMethod = method || "post";
        fetchBody = JSON.stringify(json);
      } else if (body) {
        fetchHeaders["content-type"] =
          contentType || "application/octet-stream";
        fetchMethod = method || "post";
        fetchBody = body;
      } else {
        fetchMethod = method || "get";
      }

      var fetchRequeset = new window.Request(fetchUrl, {
        headers: fetchHeaders,
        method: fetchMethod,
        body: fetchBody,
        credentials: fetchCredentials,
      });

      var fetchResponse = await window.fetch(fetchRequeset);
      var data = await this.unwrapResponseData(fetchResponse);

      if (fetchResponse.status === 403 && data.status === "no-session") {
        window.location.href = "/OturumAc";
      }

      if (fetchResponse.ok) {
        return data;
      }

      // The request came back with a non-2xx status code; but may still contain an
      // error structure that is defined by our business domain.
      return Promise.reject(this.normalizeError(data));
    } catch (error) {
      // The request failed in a critical way; the content of this error will be
      // entirely unpredictable.
      return Promise.reject(this.normalizeTransportError(error));
    }
  }

  // ---
  // PRIVATE METHODS.
  // ---

  /**
   * I build a FormData instance from the given object.
   *
   * NOTE: At this time, only simple values (ie, no files) are supported.
   */
  buildFormData(formFields) {
    var formData = new FormData();

    Object.entries(formFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  /**
   * I transform the collection of HTTP headers into a like collection wherein the names
   * of the headers have been lower-cased. This way, if we need to manipulate the
   * collection prior to transport, we'll know what key-casing to use.
   */
  buildHeaders(headers) {
    var lowercaseHeaders = Object.create(null);

    Object.entries(headers).forEach(([key, value]) => {
      lowercaseHeaders[key.toLowerCase()] = value;
    });

    return lowercaseHeaders;
  }

  /**
   * I build a query string (less the leading "?") from the given params.
   *
   * NOTE: At this time, there is no special handling of array-based values.
   */
  buildQueryString(params) {
    var queryString = Object.entries(params)
      .map(([key, value]) => {
        if (value === true) {
          return encodeURIComponent(key);
        }

        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      })
      .join("&");
    return queryString;
  }

  /**
   * I merged the given params into the given URL. This is done by parsing the URL,
   * extracting the URL-based params, merging them with the given params, and then
   * rebuilding the URL with the merged params.
   *
   * NOTE: The given params take precedence in the case of a name-conflict.
   */
  mergeParamsIntoUrl(url, params) {
    // Split on fragment segments.
    var hashParts = url.split("#", 2);
    var preHash = hashParts[0];
    var fragment = hashParts[1] || "";

    // Split on search segments.
    var urlParts = preHash.split("?", 2);
    var scriptName = urlParts[0];

    // When merging the url-params and the additional params, the additional params
    // take precedence (meaning, they will overwrite url-based params).
    var urlParams = this.parseQueryString(urlParts[1] || "");
    var mergedParams = Object.assign(urlParams, params);
    var queryString = this.buildQueryString(mergedParams);

    var results = [scriptName];

    if (queryString) {
      results.push("?", queryString);
    }

    if (fragment) {
      results.push("#", fragment);
    }

    return results.join("");
  }

  /**
   * At a minimum, we want every error to have "type" and "message" properties. These
   * are the two keys that the calling context will depend on; and, are the minimum keys
   * that the server is expected to return when it throws domain errors.
   */
  normalizeError(data) {
    var error = {
      type: "ServerError",
      message: UNEXPECTED_ERROR_MESSAGE,
    };

    // If the error data is an Object (which it should be if the server responded
    // with a domain-based error), then it should have "type" and "message"
    // properties within it. That said, just because this isn't a transport error, it
    // doesn't mean that this error is actually being returned by our application.
    if (typeof data?.type === "string" && typeof data?.message === "string") {
      return Object.assign(error, data);

      // If the error data has any other shape, it means that an unexpected error
      // occurred on the server (or somewhere in transit). Let's pass that raw error
      // through as the rootCause, but use the default error structure.
    } else {
      error.rootCause = data;
      return error;
    }
  }

  /**
   * If our request never makes it to the server (or the round-trip is interrupted
   * somehow), we still want the error response to have a consistent structure with the
   * application errors returned by the server.
   */
  normalizeTransportError(transportError) {
    return {
      type: "TransportError",
      message: UNEXPECTED_ERROR_MESSAGE,
      rootCause: transportError,
    };
  }

  /**
   * I parse the given query string into an object.
   *
   * NOTE: This method assumes that the leading "?" has already been removed.
   */
  parseQueryString(queryString) {
    var params = Object.create(null);

    for (var pair of queryString.split("&")) {
      var parts = pair.split("=", 2);
      var key = decodeURIComponent(parts[0]);
      // CAUTION: If there is no value in the query string pair, we want to use a
      // literal TRUE value since this literal value will be treated differently
      // when subsequently serializing the params back into a query string.
      var value = parts[1] ? decodeURIComponent(parts[1]) : true;
      params[key] = value;
    }

    return params;
  }

  /**
   * I unwrap the response payload from the given response based on the reported
   * content-type.
   */
  async unwrapResponseData(response) {
    var contentType = response.headers.has("content-type")
      ? response.headers.get("content-type")
      : "";
    if (RE_CONTENT_TYPE_JSON.test(contentType)) {
      return response.json();
    } else if (RE_CONTENT_TYPE_TEXT.test(contentType)) {
      return response.text();
    } else {
      return response.blob();
    }
  }
}
