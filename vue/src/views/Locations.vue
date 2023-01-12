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
 

  <MDBTable captionTop :class="$style.form">
    <caption :class="$style.form">
      <h1 :class="$style.titre">Tableau des locations</h1>
    </caption>
    <thead>
      <tr>
        <th scope="col" :class="$style.tableBorder">#location</th>
        <th scope="col">Vehicule</th>
        <th scope="col">Locataire</th>
        <th scope="col">Date de début</th>
        <th scope="col">Date de fin</th>
        <th scope="col">Prix de la location</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="location of locations" :key="location._id">
        <th scope="row">{{ location._id }}</th>
        <td>
          Marque: {{ location.vehicule.marque }} <br />
          Modèle: {{ location.vehicule.modele }} <br />
          Immatriculation:
          {{ location.vehicule.immatriculation }}
        </td>
        <td>
          {{ location.locataire.nom }} {{ location.locataire.prenom }}
        </td>
        <td>{{ location.date_de_debut }}</td>
        <td>{{ location.date_de_fin }}</td>
        <td>{{ location.prix }}</td>
        <td>
          <!-- <MDBBtn color="warning">
            <router-link :to="{ name: 'Location', params: { id: location._id } }"
              >Modifier</router-link
            >
          </MDBBtn> -->
        </td>
        <td>
          <MDBBtn color="danger" v-on:click="removeItem(location._id)">Supprimer</MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>
</template>

<script>
import { MDBBtn, MDBTable } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    // initialisation de variables
    //donnée utilisé pour l'affichage conditionnel
    return { locations: [], isEditing: false, search: "", vehicules: [], locataires: [] };
  },
  /*
   *méthode permettant de récupérer tous les locataires lors de l'initialisation de la page, tous les véhicules et locations
   */
  async created() {
    try {
      const reslocation = await axios.get(`http://localhost:5000/locations`);
      this.locations = reslocation.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
     *méthode permettant de supprimer uene location en fonction de son id
     */
    removeItem(id) {
      axios.delete(`http://localhost:5000/locations/${id}`);
      this.locations = this.locations.filter((location) => location._id !== id);
    },
  },
  name: "Locations",
  components: {
    //composants utilisés
    MDBTable,
    MDBBtn,
  },
  setup() {
    // initialisation de variables
    const locataire = ref("");
    const vehicule = ref("");
    const prix = ref();

    return {
      locataire,
      vehicule,
      prix,
    };
  },
};
</script>
