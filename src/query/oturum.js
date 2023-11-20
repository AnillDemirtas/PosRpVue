import { ApiClient } from "../helpers/api-client";
import store from "../store";

const apiClient = new ApiClient();
//   /Rp/
const config_cagir = async () => {
  return await apiClient.makeRequest({
    url: `config.json`,
    method: "GET",
  });
};

const oturumAc = async (Gsm, Parola) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_Kullanici`,
    json: {
      Gsm: Gsm,
      Parola: Parola,
    },
  });
};

export { oturumAc, config_cagir };
