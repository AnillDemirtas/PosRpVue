<template>
  <div class="text-center">
    <v-dialog hide-overlay v-model="modal" width="500">
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Tarih Filtresi</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-card-text>
          <v-form>
            <v-card-title class="mt-0"></v-card-title>
            <v-row class="mt-0">
              <v-col>
                <Datepicker
                  v-model="baslangicTarihi"
                  fieldName="firstRegistrationDate"
                  fieldType="Date"
                  label="Başlangıç Tarihi"
                  @tarihDegisti="(i) => baslangicTarihiDegisti(i)"
                />
              </v-col>
              <v-col>
                <Timepicker
                  label="Başlangıç Saati"
                  format="24hr"
                  @saatDegisti="(i) => baslangicSaatiDegisti(i)"
                ></Timepicker>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <Datepicker
                  v-model="bitisTarihi"
                  fieldName="firstRegistrationDate"
                  fieldType="Date"
                  label="Bitiş Tarihi"
                  @tarihDegisti="(i) => bitisTarihiDegisti(i)"
                />
              </v-col>
              <v-col>
                <Timepicker
                  label="Bitiş Saati"
                  format="24hr"
                  @saatDegisti="(i) => bitisSaatiDegisti(i)"
                ></Timepicker>
              </v-col>
            </v-row>

            <!-- <v-row>
              <v-icon class="icon-prepend">mdi-information-outline</v-icon>
              <v-col cols="11">
                <v-datetime-picker
                  label="Başlangıç"
                  v-model="baslangicTarihi"
                  dateFormat="dd/MM/yyyy"
                  format="24hr"
                >
                  <template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                  </template>
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn
                      color="error lighten-1"
                      @click.native="parent.clearHandler"
                      >Vazgeç</v-btn
                    >
                    <v-btn color="success darken-1" @click="parent.okHandler"
                      >Tamam</v-btn
                    >
                  </template>
                </v-datetime-picker>
              </v-col>
              <v-icon class="icon-prepend">mdi-information-outline</v-icon>
              <v-col cols="11">
                <v-datetime-picker
                  label="Bitiş"
                  v-model="bitisTarihi"
                  dateFormat="dd/MM/yyyy"
                  format="24hr"
                >
                  <template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                  </template>
                  <template slot="actions" slot-scope="{ parent }">
                    <v-btn
                      color="error lighten-1"
                      @click.native="parent.clearHandler"
                      >Vazgeç</v-btn
                    >
                    <v-btn color="success darken-1" @click="parent.okHandler"
                      >Tamam</v-btn
                    >
                  </template>
                </v-datetime-picker>
              </v-col></v-row
            > -->
          </v-form>
          <v-row class="mt-10">
            <v-spacer> </v-spacer>
            <v-btn
              class="mr-2"
              dark
              @click="$emit('hideDialog', null)"
              color="red"
            >
              Vazgeç
            </v-btn>
            <v-btn class="mr-2" dark @click="tamam_btn" color="info">
              Tamam
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import Datepicker from "./Datepicker.vue";
import Timepicker from "./Timepicker.vue";

export default {
  props: { modal: null },
  data() {
    return {
      bir_alt_comboya_gidecek_data: {
        baslangic: null,
        bitis: null,
      },

      baslangicTarihi: null,
      bitisTarihi: null,
      baslangicSaati: null,
      bitisSaati: null,
    };
  },
  computed: {},

  methods: {
    baslangicTarihiDegisti(i) {
      this.baslangicTarihi = i;
    },
    bitisTarihiDegisti(i) {
      this.bitisTarihi = i;
    },
    baslangicSaatiDegisti(i) {
      this.baslangicSaati = i;
    },
    bitisSaatiDegisti(i) {
      this.bitisSaati = i;
    },
    tamam_btn() {
      if (this.baslangicTarihi && this.bitisTarihi) {
        if (this.baslangicSaati && this.bitisSaati) {
          this.bir_alt_comboya_gidecek_data.baslangic =
            moment(this.baslangicTarihi, "DD/MM/YYYY").format("DD/MM/YYYY") +
            " " +
            this.baslangicSaati;

          this.bir_alt_comboya_gidecek_data.bitis =
            moment(this.bitisTarihi, "DD/MM/YYYY").format("DD/MM/YYYY") +
            " " +
            this.bitisSaati;
          this.$emit("hideDialog", this.bir_alt_comboya_gidecek_data);
        } else {
          //saat seçili değilse 1 günlük otomatik alyıro
          this.bir_alt_comboya_gidecek_data.baslangic =
            moment(this.baslangicTarihi, "DD/MM/YYYY").format("DD/MM/YYYY") +
            " " +
            "00:00";

          this.bir_alt_comboya_gidecek_data.bitis =
            moment(this.bitisTarihi, "DD/MM/YYYY").format("DD/MM/YYYY") +
            " " +
            "23:59";
          this.$emit("hideDialog", this.bir_alt_comboya_gidecek_data);
        }
      } else {
        alert("Başlangıç ve bitiş tarihini seçiniz");
      }
    },
  },
  components: { Datepicker, Timepicker },
};
</script>

Datepicker
