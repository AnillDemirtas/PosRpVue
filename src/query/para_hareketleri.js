import { ApiClient } from "../helpers/api-client";
import store from "../store";

const apiClient = new ApiClient();

const para_hareketleri = async () => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Para_Hareketleri`,
    json: {},
  });
};

export { para_hareketleri };
