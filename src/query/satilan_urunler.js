import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const subelere_gore_satilan_urunler = async (sube_id) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Subeye_Gore_Satilan_Urunler`,
    json: { sube_id },
  });
};

const subeye_gore_en_cok_satilan_urun_detayi = async (sube_id, urun_id) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Subelerin_Satilan_Urun_Detaylari`,
    json: { sube_id, urun_id },
  });
};

const subeye_gore_en_cok_satilan_urunler = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Subeye_Gore_En_Cok_Satilan_Urunler`,
    json: { baslangic, bitis },
  });
};

export {
  subelere_gore_satilan_urunler,
  subeye_gore_en_cok_satilan_urunler,
  subeye_gore_en_cok_satilan_urun_detayi,
};
