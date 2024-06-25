<template>
  <layout>
    <template slot="app-bar">
      <div style="display: none" />
    </template>
    <template slot="nav-bar">
      <div style="display: none" />
    </template>
    <template slot="main">
      <v-main>
        <v-container fluid style="height: 100vh" fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="black">
                  <v-img
                    max-height="50"
                    max-width="50"
                    src="../assets/report.png"
                  />

                  <v-toolbar-title>RAPORLAR</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="Gsm"
                      prepend-icon="mdi-account"
                      name="Gsm"
                      label="Gsm"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      v-model="Parola"
                      id="Parola"
                      prepend-icon="mdi-lock"
                      name="Parola"
                      label="Parola"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="black" dark @click="kullaniciGirisKontrolu()">
                    OTURUM AÇ
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </template>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";
import { oturumAc } from "../query/oturum";

export default {
  name: "Login",

  methods: {
    async hatali(gelen_mesaj) {
      await this.$dialog.error({
        text: gelen_mesaj,
        title: "Dikkat",
        actions: {
          true: {
            color: "error",
            text: "Tamam",
          },
        },
      });
    },
    async kullaniciGirisKontrolu() {
      if (this.Gsm === "" || this.Gsm === null) {
        this.hatali("Kullanici adı giriniz");
      } else if (this.Parola === "" || this.Parola === null) {
        this.hatali("Parola giriniz");
      } else {
        this.gelen_sonuc = await oturumAc(this.Gsm, this.Parola);
        console.log("zzzzz", this.gelen_sonuc?.sonuc);

        if (this.gelen_sonuc?.sonuc === false) {
          this.hatali("Parola hatalı");
        } else {
          this.$store.commit("setId", this.gelen_sonuc?.Users[0]?.id);
          this.$store.commit("setAdSoyad", this.gelen_sonuc?.Users[0]?.AdSoyad);
          localStorage.setItem("login", true);
          this.$router.push("Anasayfa");
        }
      }
    },
  },

  data() {
    return {
      Gsm: null,
      Parola: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchConfigBilgileri");
  },

  components: {
    Layout,
  },
};
</script>
