<style module>
/* balise de style interne à la page */
.form {
  background-color: rgb(231, 231, 241);
}

.row {
  width: 100%;
  margin-bottom: 1%;
}

.tableBorder {
  border: 2px solid back;
}

.titre {
  text-decoration: underline;
  color: rgba(31, 31, 136, 0.712);
}

.searchBar {
  width: 25vw;
}

.button {
  width: 120px;
}

.searchDiv {
  display: flex;
}

.cardDiv {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  width: 300px;
  height: 200px;
  margin: 1%;
}
</style>

<template>
      <form :class="$style.form" @submit.prevent="addLocataire()">
        <h1 :class="$style.titre">Ajout d'un nouveau locataire</h1>
        <MDBRow :class="$style.row">
          <MDBCol>
            <MDBInput
              type="text"
              label="Nom"
              id="nom"
              v-model="nom"
              invalidFeedback="Remplissez le champ Nom"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              type="text"
              label="Prénom"
              id="prenom"
              v-model="prenom"
              invalidFeedback="Remplissez le champ Prénom"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow :class="$style.row">
          <MDBCol>
            <MDBInput
              type="email"
              label="Adresse email"
              id="email"
              v-model="email"
              invalidFeedback="Ajoutez une adresse email"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
              pattern="(?=.*[a-z]).{6,}"
            />
          </MDBCol>
          <MDBCol>
            <MDBInput type="password" label="Password" id="password" v-model="password" />
          </MDBCol>
        </MDBRow>
        <!-- Submit button -->
        <!-- <MDBBtn color="success" @click="addLocataire()"> -->
        <MDBBtn color="success" type="submit"> Ajout d'un nouveau locataire </MDBBtn>
      </form>
</template>

<script>
// import des composants utilisés
import { MDBBtn, MDBRow, MDBCol, MDBInput } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";
export default {
  data() {
    // initialisation de variables
    //donnée utilisé pour l'affichage conditionnel
    return { locataires: [], isEditing: false, search: "" };
  },
  /*
   *méthode permettant de récupérer tous les locataires lors de l'initialisation de la page
   */
  async created() {
    try {
      // const res = await axios.get(`http://localhost:8090/locataires`);
      const res = await axios.get(`http://localhost:5000/locataires`);
      this.locataires = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
     *méthode permettant de cacher du contenu
     */
    show() {
      this.isEditing = true;
    },
    /*
     *méthode permettant de montrer du contenu
     */
    hide() {
      this.isEditing = false;
    },
    /*
     *méthode permettant d'ajouter un locataire
     */
    async addLocataire() {
      // const res = await axios.post(`http://localhost:8090/locataires`, {
        const res = await axios.post(`http://localhost:5000/locataire`, {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
      });
      this.locataires = [...this.locataires, res.data];
      this.nom = "";
      this.prenom = "";
      this.email = "";
      this.isEditing = false;
    },
    /*
     *méthode permettant de supprimer un locataire en fonction de son id
     */
    removeItem(id) {
      axios.delete(`http://localhost:5000/locataires/delete/${id}`);
      // axios.delete(`http://localhost:8090/locataires/${id}`);
      this.locataires = this.locataires.filter((locataire) => locataire._id !== id);
    },
  },
  name: "Locataires",
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
