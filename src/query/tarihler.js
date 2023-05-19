import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const secilen_tarihler = async (baslangic, bitis) => {
 
 
  return await apiClient.makeRequest({
    url: `${process.env.VUE_APP_API_URL}/tarihler?baslangic=${baslangic}&bitis=${bitis}`,
    body: JSON.stringify({ baslangic, bitis }),
  });
};

export { secilen_tarihler };
