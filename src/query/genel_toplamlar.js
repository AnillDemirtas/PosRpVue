import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const tutarlar = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Tutarlar`,
    json: { baslangic, bitis },
  });
};

const sube_tutarlari = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Sube_Toplamlari`,
    json: { baslangic, bitis },
  });
};

const tarih_secimi = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/rp_tarihler`,
    json: { baslangic, bitis },
  });
};

export { tutarlar, sube_tutarlari, tarih_secimi };
