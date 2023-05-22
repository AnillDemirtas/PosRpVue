<template>
  <div class="text-center">
    <v-dialog hide-overlay v-model="modal" width="500">
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Ders Bilgileri</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-card-text>
          <v-form>
            <v-card-title class="mt-0"></v-card-title>
            <!-- <v-row class="mt-0">
              <Datepicker
                :model="deneme"
                fieldName="firstRegistrationDate"
                fieldType="Date"
                label="Başlangıç Tarihi"
                prependIcon="mdi-information-outline"
                @tarihDegisti="(i) => baslangicTarihiDegisti(i)"
              />
            </v-row>
            <v-row class="mt-0">
              <Datepicker
                :model="deneme"
                fieldName="firstRegistrationDate"
                fieldType="Date"
                label="Bitiş Tarihi"
                prependIcon="mdi-information-outline"
                @tarihDegisti="(i) => bitisTarihiDegisti(i)"
              />
            </v-row> -->

            <v-row>
              <v-icon class="icon-prepend">mdi-information-outline</v-icon>
              <v-col cols="11">
                <v-datetime-picker
                  label="Başlangıç"
                  v-model="baslangicTarihi"
                  dateFormat="dd/MM/yyyy"
                  time-format="HH:mm"
                  :disabled="true"
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
                  time-format="HH:mm:ss"
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
            >
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
            <v-btn
              class="mr-2"
              dark
              @click="$emit('hideDialog', bir_alt_comboya_gidecek_data)"
              color="info"
            >
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

export default {
  watch: {
    async modal() {},
    baslangicTarihi(val) {
      this.bir_alt_comboya_gidecek_data.baslangic =
        moment(val).format("DD/MM/YYYY HH:mm");
    },
    bitisTarihi(val) {
      this.bir_alt_comboya_gidecek_data.bitis =
        moment(val).format("DD/MM/YYYY HH:mm");
    },
  },

  props: { modal: null },
  data() {
    return {
      bir_alt_comboya_gidecek_data: {
        baslangic: null,
        bitis: null,
      },

      baslangicTarihi: null,
      bitisTarihi: null,
    };
  },
  computed: {},

  methods: {},
  components: {},
};
</script>

Datepicker
