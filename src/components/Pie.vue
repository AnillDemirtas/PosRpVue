<template>
  <div>
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  props: { isimler: null },
  mounted() {},
  watch: {
    isimler: function (val) {
      this.gelen_sayisal_deger = val;
      this.array_convert();
    },
  },
  methods: {
    array_convert() {
      this.series = this.gelen_sayisal_deger?.map((d) => d.value) || [];
      this.chartOptions = {
        ...this.chartOptions,
        labels: this.gelen_sayisal_deger?.map((d) => d.name) || [],
      };
    },
  },
  data() {
    return {
      gelen_sayisal_deger: [],
      series: [],
      chartOptions: {
        legend: { show: true, position: "bottom" },
        labels: [],
        dataLabels: {
          formatter: function (val, opts) {
            return opts.w.config.series[opts.seriesIndex];
          },
        },
        chart: {
          type: "donut",
        },
        // responsive: [
        //   {
        //     breakpoint: 500,
        //     options: {
        //       plotOptions: {
        //         pie: {
        //           size: 900,
        //           dataLabels: {
        //             formatter: function (value) {
        //               return new Intl.NumberFormat("tr-TR", {
        //                 style: "currency",
        //                 currency: "TRY",
        //               }).format(value);
        //             },
        //           },
        //         },
        //       },
        //     },
        //   },
        // ],
      },
    };
  },
};
</script>

<style></style>
