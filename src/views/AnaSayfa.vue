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

      <v-container>
        <v-select
          v-model="default_sube"
          persistent-hint
          return-object
          single-line
          :items="subeler_selectbox?.veriler"
          item-text="Sube_adi"
          item-value="id"
          solo
        >
          <template v-slot:item="{ item }">
            <v-list-item-content :style="{ color: item.color }">
              {{ item.Sube_adi }}
            </v-list-item-content>
          </template>
        </v-select>
        <!-- <v-chip
              v-for="(sube, index) in subeler?.veriler"
              :key="index"
              :color="sube.baglanti_durumu ? 'green' : 'red'"
              class="ma-1"
              dark
              @click="sube_baglanti_durumu(sube.Sube_adi, sube.baglanti_durumu)"
            >
              {{ sube.Sube_adi }}
            </v-chip> -->

        <v-divider></v-divider>

        <v-chip-group class="white--text" column>
          <v-chip
            class="chip-item text-center"
            color="black"
            dark
            @click="tarih_arasi"
          >
            <div class="chip-text">&nbsp; &nbsp;Tarih Arası</div>
          </v-chip>
          <v-chip
            v-for="item in formattedMesailer"
            :key="item.Hours"
            :color="item.renk"
            dark
            @click="bugun(item)"
            class="chip-item"
          >
            <div class="chip-text">
              {{ item.mesaituru }}<br />{{ item.baslangic }} -
              {{ item.bitis }}
            </div>
          </v-chip>
        </v-chip-group>

        <v-card
          v-for="({ bilgi, veri, renk, icon }, i) in list"
          :key="i"
          cols="12"
          sm="6"
          md="6"
          lg="3"
          elevation="4"
          class="ma-2 pa-7 text-center"
        >
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
        <v-card cols="12" sm="6" md="6" lg="3" elevation="4" class="ma-2 pa-7">
          <v-card-title class="justify-center">Açık Masalara</v-card-title>
          <v-card-text>
            <Pie :isimler="subeye_gore_acik_masalar?.veriler"></Pie>
          </v-card-text>
        </v-card>
        <v-card cols="12" sm="6" md="6" lg="3" elevation="4" class="ma-2 pa-7">
          <v-card-title class="justify-center"
            >En Çok Satılan Ürün</v-card-title
          >
          <v-card-text>
            <Pie :isimler="subeye_gore_en_cok_satilan_urunler?.veriler"></Pie>
          </v-card-text>
        </v-card>
        <v-card cols="12" sm="6" md="6" lg="3" elevation="4" class="ma-2 pa-7">
          <v-card-title class="justify-center">Paket Siparişleri</v-card-title>
          <v-card-text>
            <Pie :isimler="gelen_paketci_tutarlari"></Pie>
          </v-card-text>
        </v-card>
        <v-card cols="12" sm="6" md="6" lg="3" elevation="4" class="ma-2 pa-7">
          <v-card-title class="justify-center"
            >Tahsilat Hareketleri</v-card-title
          >
          <v-card-text>
            <Bar :isimler="subelere_gore_tutarlar?.veriler"></Bar>
          </v-card-text>
        </v-card>
        <v-card
          cols="12"
          sm="6"
          md="6"
          lg="3"
          elevation="4"
          class="ma-2 pa-7 mb-200 text-center"
        >
          <v-card-title class="justify-center">Satılan Stoklar</v-card-title>
          <v-card-text>
            <v-btn
              color="primary"
              class="mr-2"
              v-for="sube in subeler?.veriler"
              :key="sube.id"
              @click="sube_click(sube.id)"
            >
              {{ sube.Sube_adi }}
            </v-btn>
          </v-card-text>
        </v-card>

        <SatilanStokSecenegi
          :secilen_sube_id="secilen_sube_id"
          :modal="SatilanStokSecenegiTetikle"
          @hideDialog="(i) => showSatilanStoklarSecenegiClose(i)"
        ></SatilanStokSecenegi>
      </v-container>
    </template>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout";
import Bar from "@/components/Bar";
import Pie from "@/components/Pie";

import TarihArasi from "@/components/fields/TarihArasi";
import { mesai_turleri } from "../query/tarihler";

import {
  tum_genel_tutarlar,
  subelere_gore_tutarlar,
  tarih_secimi,
} from "../query/genel_toplamlar";
import { subeye_gore_en_cok_satilan_urunler } from "../query/satilan_urunler";
import { subeye_gore_acik_masalar } from "../query/acik_masalar";
import { subeler } from "../query/subeler";

import SatilanStokSecenegi from "@/components/fields/SatilanStokSecenegi";

//import { secilen_tarihler } from "../query/tarihler";

export default {
  async mounted() {
    await this.$store.dispatch("fetchConfigBilgileri");
    this.gelen_mesailer = await mesai_turleri();
    const sonuc = this.formattedMesailer;
    const gun_belirteci = sonuc.filter(
      (item) => item.baslangicGun === 0 && item.bitisGun === 0
    );
    if (gun_belirteci.length !== 0) {
      await this.bugun(gun_belirteci[0]);
    } else {
      await this.bugun(sonuc[1]);
    }
  },

  components: {
    Layout,
    Bar,
    Pie,
    TarihArasi,
    SatilanStokSecenegi,
  },
  computed: {
    formattedMesailer() {
      return this.gelen_mesailer?.veriler.map((item) => {
        const baslangic = this.formatSaat(item.baslangic);
        const bitis = this.formatSaat(item.bitis);
        return { ...item, baslangic, bitis };
      });
    },
  },
  methods: {
    formatSaat(saat) {
      return `${this.formatZaman(saat.Hours)}:${this.formatZaman(
        saat.Minutes
      )}`;
    },
    formatZaman(zaman) {
      return zaman < 10 ? `0${zaman}` : zaman;
    },
    formatTarihVeSaat(saatString, gunBelirteci) {
      // Saat bilgisini "00:00" formatından ayrıştır
      const [saat, dakika] = saatString.split(":");

      // Referans bir tarih nesnesi oluştur
      const referansTarih = new Date();
      referansTarih.setDate(referansTarih.getDate() + gunBelirteci);

      // Saat ve dakika bilgilerini ayarla
      referansTarih.setHours(parseInt(saat, 10));
      referansTarih.setMinutes(parseInt(dakika, 10));

      // Tarih ve saat bilgilerini istediğin formatta döndür
      return (
        referansTarih.toLocaleDateString("tr-TR") +
        " " +
        referansTarih.toLocaleTimeString("tr-TR")
      );
    },
    async bugun(item) {
      console.log(
        "Başlangıç",
        this.formatTarihVeSaat(item.baslangic, item.baslangicGun)
      );
      console.log("Bitiş", this.formatTarihVeSaat(item.bitis, item.bitisGun));
      await this.tum_sorgular(
        this.formatTarihVeSaat(item.baslangic, item.baslangicGun),
        this.formatTarihVeSaat(item.bitis, item.bitisGun)
      );
    },
    tarih_arasi() {
      this.tarih_arasi_tetikle = true;
    },
    async TarhiArasiShowClose(i) {
      this.tarih_arasi_tetikle = false;
      if (i) {
        if (i.baslangic !== null && i.bitis !== null) {
          console.log("qqqq");
          await this.tum_sorgular(i.baslangic, i.bitis);
        }
      }
    },
    tutarlari_ayarlar() {
      this.list = [];
      this.list.push({
        renk: "green",
        veri: this.gelen_tum_genel_tutarlar?.veriler[0]?.tutar ?? 0,
        bilgi: "Toplam Tutar",
        icon: "mdi-cash-fast",
      });
      // this.list.push({
      //   renk: "orange",
      //   veri: this.gelen_tum_genel_tutarlar?.veriler[0]?.paketci_toplam ?? 0,
      //   bilgi: "Toplam Paket",
      //   icon: "mdi-gift-outline",
      // });
      this.list.push({
        renk: "info",
        veri: this.gelen_tum_genel_tutarlar?.veriler[0]?.iskonto ?? 0,
        bilgi: "Toplam İskonto",
        icon: "mdi-percent",
      });

      // this.list.push({
      //   renk: "orange",
      //   veri: this.gelen_tum_genel_tutarlar?.veriler[0]?.iade ?? 0,
      //   bilgi: "Toplam İade",
      //   icon: "mdi-keyboard-return",
      // });
      this.list.push({
        renk: "pink",
        veri: this.gelen_tum_genel_tutarlar?.veriler[0]?.iptal ?? 0,
        bilgi: "Toplam İptal",
        icon: "mdi-close",
      });
    },
    async sube_click(i) {
      console.log("hey");
      this.secilen_sube_id = i;
      //this.SatilanStoklarListDialog = true;
      this.SatilanStokSecenegiTetikle = true;
    },

    showSatilanStoklarSecenegiClose() {
      this.SatilanStokSecenegiTetikle = false;
    },
    // sube_baglanti_durumu(i, ii) {
    //   if (ii) {
    //     alert(i + " Bağlantı Başarılı");
    //   } else {
    //     alert(i + " Bağlantı Başarısız");
    //   }
    // },
    async tum_sorgular(baslangic, bitis) {
      this.overlay = true;
      await tarih_secimi(baslangic, bitis);
      this.gelen_tum_genel_tutarlar = await tum_genel_tutarlar(
        this.default_sube.id
      );

      this.subelere_gore_tutarlar = await subelere_gore_tutarlar(
        baslangic,
        bitis
      );

      this.subeye_gore_en_cok_satilan_urunler =
        await subeye_gore_en_cok_satilan_urunler(baslangic, bitis);
      if (this.subeye_gore_en_cok_satilan_urunler.sonuc === false) {
        this.subeye_gore_en_cok_satilan_urunler = null;
      }
      this.subeye_gore_acik_masalar = await subeye_gore_acik_masalar(
        baslangic,
        bitis
      );
      this.tutarlari_ayarlar();
      this.subeler = await subeler();
      const yeniSubeler = {
        sonuc: true,
        veriler: [
          {
            id: 0,
            Sube_adi: "Tüm Şubeler",
            Sube_ip: "33",
            baglanti_durumu: false,
            color: "red",
          },
          ...this.subeler.veriler.map((veri) => ({
            ...veri,
            color: veri.baglanti_durumu ? "green" : "red",
          })), // Diğer şubeleri ekleyin
        ],
      };

      // Oluşturulan yeni veriyi kullanın

      this.subeler_selectbox = yeniSubeler;

      this.gelen_paketci_tutarlari = this.subelere_gore_tutarlar?.veriler.map(
        (v) => ({
          name: v.paketci_toplam,
          value: v.paketci_sayi,
        })
      );

      this.overlay = false;

      // this.$nextTick(() => this.$redrawVueMasonry("masonryRow"));
    },
  },

  data() {
    return {
      baslangic_tarihi: null,
      bitis_tarihi: null,
      tarih_arasi_tetikle: null,
      overlay: false,
      gelen_mesailer: null,
      gelen_tum_genel_tutarlar: null,
      gelen_paketci_tutarlari: null,
      SatilanStokSecenegiTetikle: null,
      default_sube: {
        id: 0,
        Sube_adi: "Tüm Şubeler",
        Sube_ip: "33",
        baglanti_durumu: false,
      },

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
      subeye_gore_en_cok_satilan_urunler: null,
      subeye_gore_satilan_urunler: null,
      subeye_gore_acik_masalar: null,
      subelere_gore_tutarlar: [],
      gelen_satislar: [],
      satilan_stoklar_dialog: null,
      subeler: [],
      subeler_selectbox: [],
      secilen_sube_id: null,
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
};
</script>
<style scoped>
.chip-item {
  /* İsteğe bağlı olarak genişlik ve yükseklik ayarları */
  width: 106px;
  height: auto; /* Yüksekliği otomatik ayarlar */
}

.chip-text {
  white-space: nowrap; /* Metni wrap etmeyi engeller */
  overflow: hidden; /* Metni taşan kısımları gizler */
  text-overflow: ellipsis; /* Taşan kısımları üç nokta (...) ile gösterir */
  text-align: center; /* Metni ortalar */
}
.mb-200 {
  margin-bottom: 200px !important;
}
</style>
