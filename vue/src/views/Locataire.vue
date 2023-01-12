<style module>
/* balise de style interne à la page */
.form {
  background-color: rgb(231, 231, 241);
}
.row {
  width: 100%;
  margin-bottom: 1%;
}
.titre {
  text-decoration: underline;
  color: rgba(31, 31, 136, 0.712);
}
</style>

<template>
  <form :class="$style.form" @submit.prevent="updateAndRedirect(locataire)">
    <h1 :class="$style.titre">Modificaton des informations du locataires</h1>
    <MDBRow :class="$style.row">
      <MDBCol>
        <MDBInput type="text" label="Nom" id="nom" v-model="locataire.nom" />
      </MDBCol>
      <MDBCol>
        <MDBInput type="text" label="Prénom" id="prenom" v-model="locataire.prenom" />
      </MDBCol>
    </MDBRow>
    <MDBRow :class="$style.row">
      <MDBCol>
        <MDBInput
          type="email"
          label="Adresse email"
          id="email"
          v-model="locataire.email"
        />
      </MDBCol>
      <MDBCol>
        <MDBInput
          type="password"
          label="Password"
          id="password"
          v-model="locataire.password"
        />
      </MDBCol>
    </MDBRow>
    <MDBBtn color="success" type="submit"> Valider la modification </MDBBtn>
  </form>
  <router-view />
</template>

<script>
// import des composants utilisés
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";

export default {
  // initialisation de variables
  //champ recevant les valeur d'un locataire
  data() {
    return { locataire: [] };
  },
  /*
   *méthode se lançant à l'initialisation, et récupérant les donnée d'un locataire à partir de son id
   */
  async created() {
    try {
      const res = await axios.get(
        "http://localhost:5000/locataires/" + this.$route.params.id
      );
      this.locataire = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
     *redirection vers locataires
     */
    goToLocataires() {
      this.$router.push("/locataires");
    },
    /*
     *méthode permettant de faire la mise à jour et la redirection
     */
    updateAndRedirect(data) {
      this.update(data);
      this.goToLocataires();
    },
    /*
     *méthode permettant de modifier les données d'un locataire
     */
    async update(data) {
      try {
        await axios
          .patch("http://localhost:5000/locataires/" + this.$route.params.id, {
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            password: data.password,
          })
          .then((response) => console.log(response));
      } catch (error) {
        console.error(error);
      }
    },
  },
  name: "Locataire",
  components: {
    //composants utilisés
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
  },
  setup() {
    // initialisation de variables
    const nom = ref("");
    const prenom = ref("");
    const email = ref("");
    const password = ref("");

    return {
      nom,
      prenom,
      email,
      password,
    };
  },
};
</script>
