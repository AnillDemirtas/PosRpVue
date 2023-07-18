import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const oturumAc = async (Gsm, Parola) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/Rp_Kullanici`,
    json: {
      Gsm: Gsm,
      Parola: Parola,
    },
  });
};

export { oturumAc };
