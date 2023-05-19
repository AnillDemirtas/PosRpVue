<template>
  <div>
    <Autocomplete
      v-model="model.adresIlId"
      :items="iller_listesi?.veriler?.sonuc?.iller"
      itemText="ad"
      itemValue="id"
      label="İl"
      prependIcon="mdi-town-hall"
      clearable
      :autofocus="autofocus"
      @changed="(i) => adres_bilgileri_degisti('adresIlId', i)"
    />
    <Autocomplete
      v-model="model.adresIlceId"
      :items="ilceler_listesi?.veriler?.sonuc?.ilceler"
      itemText="ad"
      itemValue="id"
      label="İlçe"
      prependIcon="mdi-city-variant-outline"
      clearable
      @changed="(i) => adres_bilgileri_degisti('adresIlceId', i)"
    />
    <Autocomplete
      v-model="model.adresMahalleId"
      :items="mahalle_listesi?.veriler?.sonuc?.mahalleler"
      itemText="ad"
      itemValue="id"
      label="Mahalle"
      prependIcon="mdi-home-group"
      clearable
      @changed="(i) => adres_bilgileri_degisti('adresMahalleId', i)"
    />
    <v-textarea
      v-model="model.adresSatiri"
      counter="100"
      label="Adres Satırı"
      required
      prependIcon="mdi-information-outline"
      rows="1"
      rowHeight="15"
      autoGrow
      clearable
      @input="(i) => adres_bilgileri_degisti('adresSatiri', i)"
    />
  </div>
</template>

<script>
import Autocomplete from "@/components/fields/AutoComplete";
import {
  ulkeyeGoreIlleriListele,
  ileGoreIlceleriListele,
  ilceyeGoreMahalleleriListele,
} from "../../query/cografi_bolgeler";

export default {
  components: {
    Autocomplete,
  },
  async mounted() {
    this.iller_listesi = await ulkeyeGoreIlleriListele();
  },
  data() {
    return {
      iller_listesi: [],
      ilceler_listesi: [],
      mahalle_listesi: [],
    };
  },

  methods: {
    async il_degisti(i) {
      this.ilceler_listesi = await ileGoreIlceleriListele(i);
    },
    async ilceler_degisti(i) {
      this.mahalle_listesi = await ilceyeGoreMahalleleriListele(i);
    },
    adres_bilgileri_degisti(propName, propValue) {
      if (propName === "adresIlId") {
        this.model.adresMahalleId = null;
        this.mahalle_listesi = [];
      }
      this.$emit("adres_bilgileri_degisti", {
        ...this.model,
        [propName]: propValue,
      });
    },
  },

  props: {
    autofocus: null,
    model: {
      type: Object,
      default() {
        return {
          adresIlId: null,
          adresIlceId: null,
          adresMahalleId: null,
          adresSatiri: null,
        };
      },
    },
  },
  watch: {
    model: function (val) {
      if (val.adresIlId) {
        this.il_degisti(val.adresIlId);
      }
      if (val.adresIlceId) {
        this.ilceler_degisti(val.adresIlceId);
      }
    },
  },
};
</script>
