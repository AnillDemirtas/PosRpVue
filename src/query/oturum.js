import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const oturumAc = async (Gsm, Parola) => {
  
  return await apiClient.makeRequest({
    url: `${process.env.VUE_APP_API_URL}/Rp_Kullanici`,
    json: {
      Gsm: Gsm,
      Parola: Parola,
    },
  });
};

export { oturumAc };
