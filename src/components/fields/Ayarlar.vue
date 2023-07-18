<template>
  <v-form>
    <v-container>
      <v-text-field
        v-model="textDegeri"
        hint="Örnek : 192.168.1.245"
        label="Ana Bilgisayar İp"
        required
      ></v-text-field>
      <v-btn class="success" @click="kaydet">Kaydet</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return { textDegeri: null };
  },

  methods: {
    kaydet() {
      localStorage.setItem("ip", "http://" + this.textDegeri + "/FastChef/Rp");
      this.$router.push("OturumAc");
    },
  },
};
</script>

