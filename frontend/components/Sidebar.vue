<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
             <b-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                type="is-light"
                open
            >
                <div class="p-1">
                    <div class="block">
                    <img
                        src="../assets/buefy.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    />
                    </div>
                    <b-menu class="is-custom-mobile">
                        <b-menu-list label="Categorii">
                            <b-menu-item active expanded icon="settings" label="Liceu">
                                <b-menu-item v-for="cat in this.categorii" :key="cat" :label="cat" @click.native="moveTo(cat)"> </b-menu-item>
                            </b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
        </section>
    </div>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: false,
      mobile: "reduce",
      reduce: false,
      categorii: []
    };
  },
  mounted() {
        this.$axios.get(`/categorii/dupa_materie/${this.materie.idMaterii}`)
        .then( (res) => {
            this.categorii = res.data.map(r=>r.nume_categorie);
        })
  },
  methods: {
      moveTo: function(cat) {
          this.$router.push('/teste' + '/' + this.materie.nume_materie + '/' + cat)
          }
  },
  props: {
      materie: {
          type: Object
      }
  }
};
</script>