import { ApiClient } from "../helpers/api-client";

const apiClient = new ApiClient();

const ulkeyeGoreIlleriListele = async () => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/api/v1/ulkeyeGoreIlleriListele`,
    headers: {
      "donem-id": localStorage.getItem("donem_id"),
      jeton: localStorage.getItem("jeton"),
    },
    json: {
      iller: {
        ulke: {
          id: "221cdfb7-3049-678e-2443-80b45872cbb2",
        },
      },
    },
    method: "POST",
  });
};

const ileGoreIlceleriListele = async (adresIlId) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/api/v1/ileGoreIlceleriListele`,
    headers: {
      "donem-id": localStorage.getItem("donem_id"),
      jeton: localStorage.getItem("jeton"),
    },
    json: {
      ilceler: {
        il: {
          id: adresIlId,
        },
      },
    },
    method: "POST",
  });
};

const ilceyeGoreMahalleleriListele = async (adresIlceId) => {
  return await apiClient.makeRequest({
    url: `${localStorage.getItem("ip")}/api/v1/ilceyeGoreMahalleleriListele`,
    headers: {
      "donem-id": localStorage.getItem("donem_id"),
      jeton: localStorage.getItem("jeton"),
    },
    json: {
      mahalleler: {
        ilce: {
          id: adresIlceId,
        },
      },
    },
    method: "POST",
  });
};

export {
  ulkeyeGoreIlleriListele,
  ileGoreIlceleriListele,
  ilceyeGoreMahalleleriListele,
};
