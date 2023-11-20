<template>
  <v-dialog persistent v-model="modal" width="550">
    <SatilanStokDetay
      :modal="detay_modal"
      :sube_id="giden_sube_id"
      :urun_id="giden_urun_id"
      @hideDialog="showDetayClose()"
    ></SatilanStokDetay>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Paketçi Raporu
      </v-card-title>
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
        <template v-slot:dt_actions="{ item }">
          <v-icon small class="mr-2" @click="urun_detayi(item.urun_id)">
            mdi-arrow-right-bottom-bold
          </v-icon>
        </template>
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
import Datatables from "../../components/datatables/index.vue";
import { subelere_gore_satilan_urunler } from "../../query/satilan_urunler";
import SatilanStokDetay from "../../components/fields/SatilanStokDetay.vue";

export default {
  components: { Datatables, SatilanStokDetay },
  props: { modal: null, secilen_sube_id: null },

  watch: {
    async modal() {
      this.gelen_data = await subelere_gore_satilan_urunler(
        this.secilen_sube_id
      );
      console.log("gggg", this.gelen_data);
    },
  },

  data() {
    return {
      gelen_data: null,
      detay_modal: null,
      giden_sube_id: null,
      giden_urun_id: null,
      search: "",
      baslik: [
        {
          text: "Detay",
          value: "actions",
          hasSlot: true,
        },

        {
          text: "Ürün",
          value: "urun_adi",
        },

        {
          text: "Miktar",
          value: "toplam_sayi",
        },
        {
          text: "Toplam Tutar",
          value: "toplam_tutar",
        },
      ],
    };
  },
  methods: {
    urun_detayi(i) {
      this.giden_sube_id = this.secilen_sube_id;
      this.giden_urun_id = i;

      this.detay_modal = true;
    },
    showDetayClose() {
      this.detay_modal = false;
    },
  },
};
</script>

<style></style>
