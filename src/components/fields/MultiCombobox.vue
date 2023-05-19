<template>
  <v-combobox
    v-model="model"
    :items="items"
    :prependIcon="prependIcon"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    @change="onChange"
    multiple
    search-input
  >
    <template v-slot:append>
      <v-icon
        v-if="button_aktif"
        @click="button_aktif_callback"
        color="success"
      >
        mdi-plus
      </v-icon>
    </template>

    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        v-bind="attrs"
        :color="`${item.color} lighten-3`"
        :input-value="selected"
        label
      >
        <span class="pr-2">
          {{ item.ad }}
        </span>
        <v-icon
          v-if="guncelle"
          class="mr-2 ml-2"
          small
          @click="() => guncelle_callback(item.id)"
        >
          mdi-pencil
        </v-icon>
        <v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
export default {
  name: "MultiCombobox",

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
    guncelle: null,
    guncelle_callback: null,
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

<style></style>
