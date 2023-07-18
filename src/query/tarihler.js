import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const secilen_tarihler = async (baslangic, bitis) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem(
      "ip"
    )}/tarihler?baslangic=${baslangic}&bitis=${bitis}`,
    body: JSON.stringify({ baslangic, bitis }),
  });
};

export { secilen_tarihler };
