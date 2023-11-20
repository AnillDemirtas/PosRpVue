<template>
  <v-app-bar app color="black" dark>
    <v-app-bar-nav-icon
      @click="$store.state.navDrawer = !$store.state.navDrawer"
    ></v-app-bar-nav-icon>
    <div class="d-flex align-center" @click="anasayfa" style="cursor: pointer">
      <v-img
        class="shrink mr-0"
        contain
        src="@/assets/FastChef.png"
        transition="scale-transition"
        width="80"
      />

      <div class="text-h5 white--text text--darken-2 font-weight-medium"></div>
    </div>

    <v-spacer></v-spacer>
    <v-btn target="_blank" text @click="oturumSonlandir()">
      <span class="mr-2">Çıkış</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    oturumSonlandir() {
      this.$router.push({
        name: "OturumAc",
      });
      //localStorage.clear();
    },

    anasayfa() {
      this.$router.push({ name: "AnaSayfa" });
    },
  },
  components: {},
  data() {
    return {};
  },
};
</script>

<style></style>
