<template>
  <v-navigation-drawer v-model="$store.state.navDrawer" app color="black" dark>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">{{ adSoyad }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <div
        v-for="(
          { listGroup, prependIcon, items, value, title, icon, to }, i
        ) in list"
        :key="i"
      >
        <div v-if="listGroup">
          <v-list-group :value="value" :prepend-icon="prependIcon" no-action>
            <template v-slot:activator>
              <v-list-item-title v-text="title" />
            </template>
            <div
              v-for="(
                { subGroup, subItems, value, title, icon, to }, i
              ) in items"
              :key="i"
            >
              <div v-if="subGroup">
                <v-list-group :value="value" no-action sub-group>
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title v-text="title" />
                    </v-list-item-content>
                  </template>
                  <v-list-item
                    :to="to"
                    v-for="({ title, icon, to }, i) in subItems"
                    :key="i"
                    link
                  >
                    <v-list-item-title v-text="title" />
                    <v-list-item-icon>
                      <v-icon v-text="icon" />
                    </v-list-item-icon>
                  </v-list-item>
                </v-list-group>
              </div>
              <div v-else>
                <v-list-item :to="to" :key="i" class="pl-64">
                  <v-list-item-title v-text="title" />
                  <v-list-item-icon>
                    <v-icon v-text="icon" />
                  </v-list-item-icon>
                </v-list-item>
              </div>
            </div>
          </v-list-group>
        </div>
        <div v-else>
          <v-list-item :to="to">
            <v-list-item-icon>
              <v-icon v-text="icon" />
            </v-list-item-icon>
            <v-list-item-title v-text="title" />
          </v-list-item>
        </div>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    adSoyad() {
      return this.$store.getters.getAdSoyad;
    },
  },
  beforeMount() {
    this.list
      .filter((l) => l.listGroup)
      .forEach((g1) => {
        if (
          g1.items.find(
            (i) =>
              i.to &&
              (i.to.name === this.$route.name ||
                i.relatedRoutes?.includes(this.$route.name))
          )
        ) {
          Object.defineProperty(g1, "value", { value: true });
        }
        g1.items
          .filter((i) => i.subGroup)
          .forEach((g2) => {
            if (
              g2.subItems.find(
                (i) =>
                  i.to &&
                  (i.to.name === this.$route.name ||
                    i.relatedRoutes?.includes(this.$route.name))
              )
            ) {
              Object.defineProperty(g1, "value", { value: true });
              Object.defineProperty(g2, "value", { value: true });
            }
          });
      });
  },

  data: () => ({
    mini: true,
    list: [
      {
        title: "Ana Sayfa",
        icon: "mdi-home",
        to: { name: "AnaSayfa" },
      },
      {
        listGroup: true,
        prependIcon: "mdi-cog-outline",
        title: "Ayarlar",
        items: [
          {
            title: "Şubeler",
            icon: "mdi-google-classroom",
            to: { name: "SubeList" },
          },
          // },
        ],
      },
    ],
  }),
};
</script>

<style scoped>
.pl-64 {
  padding-left: 64px;
}
</style>
