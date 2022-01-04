<template>
  <div>
      <b-field label="Adauga materie">
          <b-input v-model="materie"></b-input>
            <b-button
                tag="input"
                value="Trimite in baza de date"
                @click="TrimiteMaterie" />
      </b-field>  </div>
</template>

<script>
export default {
  data(){
    return {
      materie: ""
    }
  },
  methods: {
    TrimiteMaterie(){
      this.$axios.post("/materii", materie).then((res)=>{
        this.$buefy.snackbar.open({
                    duration: 5000,
                    message: 'Materiea adaugata',
                    position: 'is-bottom-left',
                    type: "danger"
                })
      })
    }
  }
}
</script>

<style>

</style>