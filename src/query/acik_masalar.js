import { ApiClient } from "../helpers/api-client";
import store from "../store";

const apiClient = new ApiClient();

const subeye_gore_acik_masalar = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Subeye_Gore_Acik_Masalar`,
    json: { baslangic, bitis },
  });
};

export { subeye_gore_acik_masalar };
