import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const para_hareketleri = async () => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Para_Hareketleri`,
    json: {},
  });
};

export { para_hareketleri };
