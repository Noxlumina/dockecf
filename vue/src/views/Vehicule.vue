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
  <MDBBtn color="primary" @:click="goToVehicules()"> Retour </MDBBtn>
  <form :class="$style.form" @submit.prevent="updateAndRedirect(vehicule)">
    <h1 :class="$style.titre">Modificaton des informations du véhicules</h1>
    <MDBRow :class="$style.row">
      <MDBCol>
        <MDBInput
          type="text"
          label="Immatriculation"
          id="immatriculation"
          v-model="vehicule.immatriculation"
        />
      </MDBCol>
      <MDBCol>
        <MDBInput type="text" label="Marque" id="marque" v-model="vehicule.marque" />
      </MDBCol>
      <MDBCol>
        <MDBInput type="text" label="Modèle" id="modele" v-model="vehicule.modele" />
      </MDBCol>
    </MDBRow>
    <MDBRow :class="$style.row">
      <MDBCol>
        <MDBInput type="text" label="Etat" id="etat" v-model="vehicule.etat" />
      </MDBCol>
      <MDBCol>
        <MDBInput type="number" label="Prix" id="prix" v-model="vehicule.prix" />
      </MDBCol>
      <MDBCol>
        <label>Disponibilité &nbsp;</label>
        <MDBRadio
          label="true"
          value="true"
          v-model="vehicule.disponibilite"
          inline
          name="inlineRadioOptions"
        />
        <MDBRadio
          label="false"
          value="false"
          v-model="vehicule.disponibilite"
          inline
          name="inlineRadioOptions"
        />
      </MDBCol>
      <MDBCol>
        <div>Type du véhicule: {{ type }}</div>
        <select v-model="vehicule.type">
          <option disabled value="">---type---</option>
          <option>voiture</option>
          <option>motocycle</option>
          <option>utilitaire</option>
          <option>camion</option>
        </select>
      </MDBCol>
    </MDBRow>
    <MDBBtn color="success" @click="updateAndRedirect(vehicule)"
      >Valider la modification</MDBBtn
    >
  </form>
  <router-view />
</template>

<script>
// import des composants utilisés
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBRadio } from "mdb-vue-ui-kit";
import axios from "axios";
import { ref } from "vue";

export default {
  // initialisation de variables
  //champ recevant les valeur d'un véhicule
  data() {
    return { vehicule: [] };
  },
  /*
   *méthode se lançant à l'initialisation, et récupérant les donnée d'un véhicule à partir de son id
   */
  async created() {
    try {
      const res = await axios.get(
        "http://localhost:5000/vehicules/" + this.$route.params.id
      );
      this.vehicule = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
     *redirection vers véhicules
     */
    goToVehicules() {
      this.$router.push("/vehicules");
    },
    /*
     *méthode permettant de faire la mise à jour et la redirection
     */
    updateAndRedirect(data) {
      this.update(data);
      this.goToVehicules();
    },
    /*
     *méthode permettant de modifier les données d'un véhicule, mais problème non reconnu comme une fonction à nouveau
     */
    async update(data) {
      try {
        await axios;
        await axios
          .patch("http://localhost:5000/vehicules/" + this.$route.params.id, {
            immatriculation: data.immatriculation,
            modele: data.modele,
            marque: data.marque,
            etat: data.etat,
            prix: data.prix,
            disponibilite: data.disponibilite,
            type: data.type,
          })
          .then((response) => console.log(response));
      } catch (error) {
        console.error(error);
      }
    },
  },
  name: "Vehicule",
  components: {
        //composants utilisés
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBRadio,
  },
  setup() {
        // initialisation de variables
    const immatriculation = ref("");
    const modele = ref("");
    const marque = ref("");
    const etat = ref("");
    const prix = ref("");
    const disponibilite = ref("");
    const type = ref("");

    return {
      immatriculation,
      modele,
      marque,
      etat,
      prix,
      disponibilite,
      type,
    };
  },
};
</script>
