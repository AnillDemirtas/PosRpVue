import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const subeye_gore_acik_masalar = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Subeye_Gore_Acik_Masalar`,
    json: { baslangic, bitis },
  });
};

export { subeye_gore_acik_masalar };
