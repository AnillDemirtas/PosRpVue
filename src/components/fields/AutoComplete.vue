<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :prependIcon="prependIcon"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    @change="onChange"
    clearable
  >
    <template>
      <v-icon
        slot="append"
        v-if="button_aktif"
        @click="button_aktif_callback"
        color="success"
      >
        mdi-plus
      </v-icon>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: "Autocomplete",

  data() {
    return {
      model: null,
    };
  },

  props: {
    prependIcon: null,
    value: null,
    items: [],
    label: null,
    itemText: null,
    itemValue: null,
    button_aktif: null,
    button_aktif_callback: null,
  },

  methods: {
    onChange(val) {
      this.$emit("changed", val);
    },
  },

  watch: {
    value: function (val) {
      this.model = val;
    },
  },
};
</script>
