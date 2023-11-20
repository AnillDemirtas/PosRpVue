import { ApiClient } from "../helpers/api-client";
import store from "../store";

const apiClient = new ApiClient();

const secilen_tarihler = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/tarihler?baslangic=${baslangic}&bitis=${bitis}`,
    body: JSON.stringify({ baslangic, bitis }),
  });
};

const mesai_turleri = async () => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_MesaiSaatleri`,
  });
};

export { secilen_tarihler, mesai_turleri };
