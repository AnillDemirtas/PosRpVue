<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      style="white-space: nowrap"
      mobile-breakpoint="1"
      disable-pagination
      disable-sort
      hide-default-footer
    >
      <template
        v-slot:[`item.${header.value}`]="{ item }"
        v-for="header in headers.filter((v) => v.hasSlot)"
      >
        <slot :name="`dt_${header.value}`" :item="item"></slot>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "DataTable",

  props: {
    headers: Array,
    items: Array,
  },

  data() {
    return {};
  },
};
</script>
