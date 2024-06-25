import { ApiClient } from "../helpers/api-client";
import store from "../store";

const apiClient = new ApiClient();

const paketci_raporu = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${store.state.apiurl}/Rp_paketci_raporu`,
    json: { baslangic, bitis },
  });
};

export { paketci_raporu };
