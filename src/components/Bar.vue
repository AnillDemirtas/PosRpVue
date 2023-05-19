<template>
  <apexchart
    type="bar"
    :options="chartOptions"
    :key="key"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  props: { isimler: null },
  mounted() {},
  watch: {
    isimler: function (val) {
      this.gelen_sayisal_deger = val;
      this.array_convert();
      this.key = this.key + 1;
    },
  },
  methods: {
    array_convert() {
      this.chartOptions.xaxis = {
        categories: this.gelen_sayisal_deger?.map((d) => d.sube_adi),
      };
      this.series = [
        {
          name: "₺",
          data: this.gelen_sayisal_deger?.map((d) => d.tutar),
          formatedData: [],
        },
      ];
    },
    formatData() {
      const formatter = new Intl.NumberFormat("en-TR", {
        style: "currency",
        currency: "TRY",
      });
      this.series[0].formattedData = this.series[0].data.map((value) =>
        formatter.format(value)
      );
    },
  },
  created() {
    this.formatData();
  },
  data() {
    return {
      key: 1,
      chartOptions: {
        dataLabels: {
          overflow: "ellipsis",
          style: {
            fontSize: "10px", // Metin boyutunu istediğiniz değere ayarlayın
          },
          formatter: function (val) {
            return new Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(val);
          },
        },
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(value);
            },
          },
        },
        plotOptions: {
          bar: {
            size: 900,
            dataLabels: {
              formatter: function (value) {
                return new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                }).format(value);
              },
            },
          },
        },
      },
      series: [
        {
          name: "",
          data: [],
        },
      ],
    };
  },
};
</script>

<style></style>
