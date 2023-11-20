import { ApiClient } from "../helpers/api-client";
import store from "../store";

const apiClient = new ApiClient();

const subeler = async () => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Subeler`,
    json: {},
  });
};

export { subeler };
