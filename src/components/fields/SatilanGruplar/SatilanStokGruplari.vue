<template>
  <v-dialog persistent v-model="modal" width="600">
    <SatilanGrupDetay
      :modal="detay_modal"
      :sube_id="giden_sube_id"
      :grup_id="giden_grup_id"
      @hideDialog="showDetayClose()"
    ></SatilanGrupDetay>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Satılan ürünler
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
          <v-icon small class="mr-2" @click="grup_detayi(item.grup_id)">
            mdi-arrow-right-bottom-bold
          </v-icon>
        </template>
      </Datatables>
      <div class="text-center">
        <strong>Toplam Tutar:</strong> {{ total_tutar }}
      </div>
      <div class="text-center">
        <strong>Toplam Miktar:</strong> {{ total_sayi }}
      </div>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="$emit('hideDialog')"> Kapat </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Datatables from "@/components/datatables/index.vue";
import { subeye_gore_satilan_urun_gruplari } from "@/query/satilan_urunler";
import SatilanGrupDetay from "@/components/fields/SatilanGruplar/SatilanGrupDetay.vue";

export default {
  components: { Datatables, SatilanGrupDetay },
  props: { modal: null, secilen_sube_id: null },

  watch: {
    async modal() {
      this.gelen_data = await subeye_gore_satilan_urun_gruplari(
        this.secilen_sube_id
      );
      this.calculateTotals();
    },
  },
  data() {
    return {
      gelen_data: null,
      detay_modal: null,
      giden_sube_id: null,
      giden_grup_id: null,
      total_tutar: 0,
      total_sayi: 0,
      search: "",
      baslik: [
        {
          text: "Detay",
          value: "actions",
          hasSlot: true,
          align: "center",
        },

        {
          text: "Gruplar",
          value: "grup_adi",
          align: "center",
        },

        {
          text: "Miktar",
          value: "sayi",
          align: "center",
        },
        {
          text: "Toplam Tutar",
          value: "toplam",
          align: "center",
        },
      ],
    };
  },
  methods: {
    grup_detayi(i) {
      this.giden_sube_id = this.secilen_sube_id;
      this.giden_grup_id = i;

      this.detay_modal = true;
    },
    showDetayClose() {
      this.detay_modal = false;
    },
    calculateTotals() {
      if (!this.gelen_data || !this.gelen_data.veriler) {
        return;
      }
      this.total_tutar = this.gelen_data.veriler
        .reduce((acc, item) => acc + parseFloat(item.toplam || 0), 0)
        .toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      this.total_sayi = this.gelen_data.veriler.reduce(
        (acc, item) => acc + parseInt(item.sayi || 0),
        0
      );
    },
  },
};
</script>
