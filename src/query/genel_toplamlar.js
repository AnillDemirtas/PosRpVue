import { ApiClient } from "../helpers/api-client";
import store from "../store";

const apiClient = new ApiClient();

const tum_genel_tutarlar = async (sube_id) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Tutarlar?sube_id=${sube_id}`,
  });
};

const subelere_gore_tutarlar = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Sube_Toplamlari`,
    json: { baslangic, bitis },
  });
};

const tarih_secimi = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/rp_tarihler?baslangic=${baslangic}&bitis=${bitis}`,
  });
};

export { tum_genel_tutarlar, subelere_gore_tutarlar, tarih_secimi };
