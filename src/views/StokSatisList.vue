<template>
  <Layout>
    <template slot="main">
      <TarihArasi
        :modal="tarih_arasi_tetikle"
        @hideDialog="(i) => TarhiArasiShowClose(i)"
      ></TarihArasi>
      <div class="ml-7 mt-5 ma-5">
        <v-btn @click="dun" class="mr-2" color="pink" dark> Dün </v-btn>
        <v-btn @click="bugun" class="mr-2" color="info"> Bugün </v-btn>
        <v-btn @click="tarih_arasi" class="mr-2" color="black" dark>
          Tarih Arası
        </v-btn>
      </div>
      <datatables
        :headers="headers"
        :items="satilan_urunler_list?.tutarlar?.recordset"
      >
        <template v-slot:dt_actions="{ item }">
          <v-icon small class="mr-2" @click="updateDialog(item.id)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="silDialog(item)">mdi-delete</v-icon>
        </template>
      </datatables></template
    >
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import { satilan_urunler } from "../query/satilan_urunler";
import Datatables from "@/components/datatables/index.vue";
import TarihArasi from "@/components/fields/TarihArasi";
export default {
  async mounted() {
    this.satilan_urunler_list = await satilan_urunler();

    this.$nextTick(() => this.$redrawVueMasonry("masonryRow"));
  },

  data() {
    return {
      satilan_urunler_list: null,
      tarih_arasi_tetikle: null,
      headers: [
        {
          text: "Ürün",
          value: "urunadi",
        },

        {
          text: "Miktar",
          value: "Miktar",
        },
        {
          text: "Toplam Tutar",
          value: "ToplamTutar",
        },
      ],
    };
  },
  methods: {
    tarih_arasi() {
      this.tarih_arasi_tetikle = true;
    },
    dun() {},
    bugun() {},
    TarhiArasiShowClose(i) {
      console.log(i);
      this.tarih_arasi_tetikle = false;
    },
  },
  components: { Layout, Datatables, TarihArasi },
};
</script>

<style></style>
