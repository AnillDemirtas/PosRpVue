import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const subeler = async () => {
  return await apiClient.makeRequest({
    url: `${process.env.VUE_APP_API_URL}/Rp_Subeler`,
    json: {},
  });
};

export { subeler };
