<template>
  <v-dialog persistent v-model="modal" width="600">
    <SatilanStoklarList
      :modal="SatilanStoklarListDialog"
      :secilen_sube_id="secilen_sube_id"
      @hideDialog="showSatilanStoklarClose()"
    ></SatilanStoklarList>
    <SatilanStokGruplari
      :modal="GruplarDialogTetikle"
      :secilen_sube_id="secilen_sube_id"
      @hideDialog="showSatilanGruplarClose()"
    ></SatilanStokGruplari>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Seçenekler </v-card-title>
      <v-card-text class="text-center mt-7">
        <v-btn @click="gruplar" depressed color="primary"> Gruplar </v-btn>
        <v-btn @click="tumu" class="ml-3" depressed color="primary">
          Tümü
        </v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="$emit('hideDialog')"> Kapat </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SatilanStoklarList from "./SatilanUrunler/SatilanStoklar.vue";
import SatilanStokGruplari from "./SatilanGruplar/SatilanStokGruplari.vue";

export default {
  props: { modal: null, secilen_sube_id: null },

  data() {
    return { SatilanStoklarListDialog: null, GruplarDialogTetikle: null };
  },
  methods: {
    tumu() {
      this.SatilanStoklarListDialog = true;
    },
    gruplar() {
      this.GruplarDialogTetikle = true;
    },
    showSatilanStoklarClose() {
      this.SatilanStoklarListDialog = false;
    },
    showSatilanGruplarClose() {
      this.GruplarDialogTetikle = false;
    },
  },
  components: {
    SatilanStoklarList,
    SatilanStokGruplari,
  },
};
</script>
