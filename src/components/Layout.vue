<template>
  <v-app>
    <template>
      <slot name="nav-bar">
        <nav-bar />
      </slot>
      <slot name="app-bar">
        <app-bar />
      </slot>
      <v-main>
        <slot name="main" />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
import NavBar from "@/components/NavBar";

export default {
  name: "Layout",

  components: {
    AppBar,
    NavBar,
  },
};
</script>
