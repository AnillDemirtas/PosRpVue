<template>
  <v-dialog persistent v-model="modal" width="550">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Detaylar </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        >
        </v-text-field>
      </v-card-text>

      <Datatables
        :headers="baslik"
        :items="gelen_data?.veriler"
        :search="search"
      >
      </Datatables>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="$emit('hideDialog')"> Kapat </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Datatables from "../../datatables/index.vue";
import { subeye_gore_en_cok_satilan_urun_detayi } from "@/query/satilan_urunler";
export default {
  components: { Datatables },
  props: { modal: null, sube_id: null, urun_id: null },

  watch: {
    async modal() {
      this.gelen_data = await subeye_gore_en_cok_satilan_urun_detayi(
        this.sube_id,
        this.urun_id
      );
    },
  },

  data() {
    return {
      gelen_data: null,
      search: "",
      baslik: [
        {
          text: "Ürün",
          value: "urun_adi",
          align: "center",
        },

        {
          text: "Miktar",
          value: "toplam_sayi",
          align: "center",
        },
        {
          text: "Toplam Tutar",
          value: "toplam_tutar",
          align: "center",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style></style>
