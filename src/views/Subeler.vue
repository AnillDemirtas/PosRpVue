<template>
  <Layout>
    <template slot="main">
      <datatables :headers="headers" :items="subeler_list?.veriler">
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
import { subeler } from "../query/subeler";
import Datatables from "@/components/datatables/index.vue";
export default {
  async mounted() {
    this.subeler_list = await subeler();
  },

  data() {
    return {
      subeler_list: null,
      tarih_arasi_tetikle: null,
      headers: [
        {
          text: "Şube",
          value: "Sube_adi",
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
  components: { Layout, Datatables },
};
</script>

<style></style>
