<template>
  <v-dialog ref="dialog" v-model="date_modal" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="label"
        v-bind="attrs"
        v-on="on"
        clearable
        @input="onTextInput"
        v-mask="'##/##/####'"
        persistent-hint
        :prepend-icon="prependIcon"
      >
      </v-text-field>
    </template>
    <v-date-picker  v-model="dateContent" locale="tr-tr" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="date_modal = false">Vazgeç</v-btn>
      <v-btn text color="primary" @click="onPickerInput">Tamam</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  name: "DatePicker",

  props: {
    model: null,
    label: null,
    prependIcon: null,
  },

  data() {
    return {
      date_modal: false,
      date: null,
      dateFormatted: null,
      dateContent: null,
      defaultHint: "GG/AA/YYYY biçiminde Gün, Ay ve Yıl",
    };
  },

  methods: {
    onTextInput() {
      if (
        this.dateFormatted !== null &&
        !moment(this.dateFormatted, "DD/MM/YYYY", true).isValid()
      ) {
        return;
      }
      this.dateContent = this.parseDate(this.dateFormatted);
    },

    onPickerInput() {
      this.$refs.dialog.save();
      this.dateFormatted = this.formatDate(this.dateContent);
      this.$emit("tarihDegisti", this.dateFormatted);
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },

  watch: {
    dateContent: function (val) {
      if (this.model !== undefined) {
        this.currentValue = this.model;
      } else {
        this.currentValue = val;
      }
    },
    model: function (val) {
      if (val !== undefined) {
        const d = moment(val, moment.ISO_8601);
        if (d.isValid()) {
          this.dateFormatted = d.format("DD/MM/YYYY");
          this.dateContent = this.parseDate(this.dateFormatted);
        }
      }
    },
  },
};
</script>
