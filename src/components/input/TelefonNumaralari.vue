<template>
  <v-text-field
    v-model="internalModel"
    label="GSM No."
    required
    prependIcon="mdi-cellphone-basic"
    v-mask="'+90 (###) ### ## ##'"
    clearable
    @input="(i) => telefon_degisti(i)"
  >
    <template>
      <v-icon
        slot="append"
        v-if="gsm_aktif"
        @click="gsm_callback"
        color="success"
      >
        mdi-check-circle-outline
      </v-icon>
      <v-icon
        v-else-if="gsm_aktif === false"
        slot="append"
        @click="gsm_callback"
        color="success"
      >
        mdi-radiobox-blank
      </v-icon>
      <v-icon v-else-if="gsm_aktif === null" slot="append" color="success">
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    model: null,
    gsm_aktif: null,
    gsm_callback: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },

  methods: {
    telefon_degisti(propValue) {
      this.$emit("telefon_degisti", propValue);
    },
  },
  data() {
    return { internalModel: this.model };
  },

  watch: {
    model(v) {
      this.internalModel = v;
    },
  },
};
</script>
