import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();
import store from "../store";

const subelere_gore_satilan_urunler = async (sube_id) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Subeye_Gore_Satilan_Urunler?sube_id=${sube_id}`,
  });
};

const subeye_gore_en_cok_satilan_urun_detayi = async (sube_id, urun_id) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Subelerin_Satilan_Urun_Detaylari?sube_id=${sube_id}&urun_id=${urun_id}`,
    json: { sube_id, urun_id },
  });
};

const subeye_gore_en_cok_satilan_urunler = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Subeye_Gore_En_Cok_Satilan_Urunler?baslangic=${baslangic}&bitis=${bitis}`,
    json: { baslangic, bitis },
  });
};

const subeye_gore_satilan_urun_gruplari = async (sube_id) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Subelerin_Satilan_Urun_Gruplari?sube_id=${sube_id}`,
  });
};

const subeye_gore_satilan_urun_gruplar_detayi = async (sube_id, grup_id) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Subelerin_Satilan_Urun_Gruplar_Detayi?sube_id=${sube_id}&grup_id=${grup_id}`,
  });
};

export {
  subelere_gore_satilan_urunler,
  subeye_gore_en_cok_satilan_urunler,
  subeye_gore_en_cok_satilan_urun_detayi,
  subeye_gore_satilan_urun_gruplari,
  subeye_gore_satilan_urun_gruplar_detayi,
};
