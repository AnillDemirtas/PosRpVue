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
            <v-row class="mt-0">
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
            </v-row>
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
import Datepicker from "@/components/fields/Datepicker";

export default {
  watch: {
    async modal() {},
  },

  props: { modal: null },
  data() {
    return {
      deneme: null,
      bir_alt_comboya_gidecek_data: {
        baslangic: null,
        bitis: null,
      },
    };
  },

  methods: {
    baslangicTarihiDegisti(i) {
      this.bir_alt_comboya_gidecek_data.baslangic = i;
    },
    bitisTarihiDegisti(i) {
      this.bir_alt_comboya_gidecek_data.bitis = i;
    },
  },
  components: { Datepicker },
};
</script>

Datepicker
