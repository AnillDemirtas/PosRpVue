<template>
  <Layout>
    <template slot="main">
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <TarihArasi
        :modal="tarih_arasi_tetikle"
        @hideDialog="(i) => TarhiArasiShowClose(i)"
      ></TarihArasi>

      <div class="text-center">
        <v-card>
          <div class="ml-7 mt-5 ma-5"></div>
          <v-card-title>
            <v-btn @click="tarih_arasi" class="mr-2" color="black" dark>
              Tarih Arası
            </v-btn>
            <v-spacer></v-spacer>

            <v-chip
              v-for="(sube, index) in subelere_gore_tutarlar?.veriler"
              :key="index"
              :color="sube.baglanti_durumu ? 'green' : 'red'"
              class="ma-1"
              dark
              @click="sube_baglanti_durumu(sube.sube_adi, sube.baglanti_durumu)"
            >
              {{ sube.sube_adi }}
            </v-chip>
          </v-card-title>

          <v-card-text>
            <v-form>
              <v-row
                v-masonry="`masonryRow`"
                item-selector=".vMasonryTileCol"
                class="mt-0 ml-1 mb-5"
              >
                <v-col
                  v-for="({ bilgi, veri, renk, icon }, i) in list"
                  :key="i"
                  v-masonry-tile
                  class="pa-1 vMasonryTileCol"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="3"
                >
                  <v-card elevation="4" class="ma-2 pa-7">
                    <v-list-item three-line>
                      <v-list-item-avatar tile size="80" :color="renk">
                        <v-icon color="white">{{ icon }}</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1">
                          {{
                            new Intl.NumberFormat("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            }).format(veri)
                          }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ bilgi }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-col>
                <v-col
                  v-masonry-tile
                  class="pa-1 vMasonryTileCol"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                >
                  <v-card elevation="4" class="ma-2 pa-7">
                    <v-card-title class="justify-center"
                      >Açık Masalar</v-card-title
                    >
                    <Pie :isimler="subeye_gore_acik_masalar?.veriler"></Pie>
                  </v-card>
                </v-col>
                <v-col
                  v-masonry-tile
                  class="pa-1 vMasonryTileCol"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                >
                  <v-card elevation="4" class="ma-2 pa-7">
                    <v-card-title class="justify-center"
                      >En Çok Satılan Ürün</v-card-title
                    >
                    <Pie
                      :isimler="subeye_gore_en_cok_satilan_urunler?.veriler"
                    ></Pie>
                  </v-card>
                </v-col>
                <v-col
                  v-masonry-tile
                  class="pa-1 vMasonryTileCol"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                >
                  <v-card elevation="4" class="ma-2 pa-7">
                    <v-card-title class="justify-center"
                      >Tahsilat Hareketleri</v-card-title
                    >

                    <Bar :isimler="subelere_gore_tutarlar?.veriler"></Bar>
                  </v-card>
                </v-col>
                <v-col
                  v-masonry-tile
                  class="pa-1 vMasonryTileCol"
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                >
                  <v-card elevation="4" class="ma-2 pa-7">
                    <v-card-title class="justify-center"
                      >Satılan Stoklar</v-card-title
                    >
                    <v-card-actions>
                      <v-row justify="center">
                        <v-btn
                          color="primary"
                          class="mr-2"
                          v-for="sube in subeler?.veriler"
                          :key="sube.id"
                          @click="sube_click(sube.id)"
                        >
                          {{ sube.Sube_adi }}
                        </v-btn>
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>

            <SatilanStoklarList
              :modal="SatilanStoklarListDialog"
              :secilen_sube_id="secilen_sube_id"
              @hideDialog="showSatilanStoklarClose()"
            ></SatilanStoklarList>
            <PaketciTutarlari></PaketciTutarlari>
          </v-card-text>
        </v-card>
      </div>
    </template>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout";
import Bar from "@/components/Bar";
import Pie from "@/components/Pie";

import TarihArasi from "@/components/fields/TarihArasi";

import {
  tutarlar,
  sube_tutarlari,
  tarih_secimi,
} from "../query/genel_toplamlar";
import { subeye_gore_en_cok_satilan_urunler } from "../query/satilan_urunler";
import { subeye_gore_acik_masalar } from "../query/acik_masalar";
import { subeler } from "../query/subeler";
import SatilanStoklarList from "@/components/fields/SatilanStoklar.vue";
import PaketciTutarlari from "@/components/fields/PaketciTutarlari.vue";

//import { secilen_tarihler } from "../query/tarihler";

export default {
  async mounted() {
    this.subelere_gore_tutarlar = await tutarlar(
      new Date().toLocaleDateString("tr-TR"),
      new Date().toLocaleDateString("tr-TR")
    );
    this.sube_tutarlari = await sube_tutarlari(
      new Date().toLocaleDateString("tr-TR"),
      new Date().toLocaleDateString("tr-TR")
    );
    this.subeye_gore_en_cok_satilan_urunler =
      await subeye_gore_en_cok_satilan_urunler(
        new Date().toLocaleDateString("tr-TR"),
        new Date().toLocaleDateString("tr-TR")
      );
    this.subeye_gore_acik_masalar = await subeye_gore_acik_masalar(
      new Date().toLocaleDateString("tr-TR"),
      new Date().toLocaleDateString("tr-TR")
    );

    this.tutarlari_ayarlar();
    this.subeler = await subeler();

    this.$nextTick(() => this.$redrawVueMasonry("masonryRow"));
  },
  components: {
    Layout,
    Bar,
    Pie,
    TarihArasi,
    SatilanStoklarList,
    PaketciTutarlari,
  },
  methods: {
    tarih_arasi() {
      this.tarih_arasi_tetikle = true;
    },
    async TarhiArasiShowClose(i) {
      this.tarih_arasi_tetikle = false;
      if (i) {
        if (i.baslangic !== null && i.bitis !== null) {
          this.overlay = true;
          await tarih_secimi(i.baslangic, i.bitis);
          this.subelere_gore_tutarlar = await tutarlar(i.baslangic, i.bitis);
          this.sube_tutarlari = await sube_tutarlari(i.baslangic, i.bitis);
          this.subeye_gore_en_cok_satilan_urunler =
            await subeye_gore_en_cok_satilan_urunler(i.baslangic, i.bitis);
          if (this.subeye_gore_en_cok_satilan_urunler.sonuc === false) {
            this.subeye_gore_en_cok_satilan_urunler = null;
          }
          this.subeye_gore_acik_masalar = await subeye_gore_acik_masalar(
            i.baslangic,
            i.bitis
          );
          this.tutarlari_ayarlar();

          this.overlay = false;

          this.$nextTick(() => this.$redrawVueMasonry("masonryRow"));
        }
      }
    },
    tutarlari_ayarlar() {
      this.list = [];
      this.list.push({
        renk: "green",
        veri: this.sube_tutarlari?.veriler[0]?.tutar,
        bilgi: "Toplam Tutar",
        icon: "mdi-cash-fast",
      });
      this.list.push({
        renk: "info",
        veri: this.sube_tutarlari?.veriler[0]?.iskonto,
        bilgi: "Toplam İskonto",
        icon: "mdi-percent",
      });

      this.list.push({
        renk: "orange",
        veri: this.sube_tutarlari?.veriler[0]?.iade,
        bilgi: "Toplam İade",
        icon: "mdi-keyboard-return",
      });
      this.list.push({
        renk: "pink",
        veri: this.sube_tutarlari?.veriler[0]?.iptal,
        bilgi: "Toplam İptal",
        icon: "mdi-close",
      });
    },
    async sube_click(i) {
      this.secilen_sube_id = i;
      this.SatilanStoklarListDialog = true;
    },
    urun_detayi() {},
    showSatilanStoklarClose() {
      this.SatilanStoklarListDialog = false;
    },
    sube_baglanti_durumu(i, ii) {
      if (ii) {
        alert(i + " Bağlantı Başarılı");
      } else {
        alert(i + " Bağlantı Başarısız");
      }
    },
  },

  data() {
    return {
      baslangic_tarihi: null,
      bitis_tarihi: null,
      tarih_arasi_tetikle: null,
      overlay: false,
      list: [
        {
          renk: null,
          veri: null,
          bilgi: null,
        },
      ],
      veri: null,
      kasa_adlari: null,
      kasa_toplamlari: [],
      power: 100,
      low: 50,
      para_hareketleri: null,
      subelere_gore_tutarlar: null,
      subeye_gore_en_cok_satilan_urunler: null,
      subeye_gore_satilan_urunler: null,
      subeye_gore_acik_masalar: null,
      sube_tutarlari: [],
      gelen_satislar: [],
      satilan_stoklar_dialog: null,
      subeler: [],
      secilen_sube_id: null,
      search: "",
      SatilanStoklarListDialog: null,
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
};
</script>
