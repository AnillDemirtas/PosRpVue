import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const subeler = async () => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Subeler`,
    json: {},
  });
};

export { subeler };
