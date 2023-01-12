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
  <div>
    <MDBBtn color="success" v-on:click="show" v-if="!isEditing"
      >Ajouter un véhicule</MDBBtn
    >
    <div v-else>
      <MDBBtn color="danger" @:click="hide">Fermer le formulaire</MDBBtn>
      <form :class="$style.form" @submit.prevent="addVehicule()">
        <h1 :class="$style.titre">Ajout d'un nouveau véhicule</h1>
        <MDBRow :class="$style.row">
          <MDBCol>
            <MDBInput
              type="text"
              label="Immatriculation"
              id="immatriculation"
              v-model="immatriculation"
              invalidFeedback="Remplissez le champ Immatriculation"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
              minLength="9"
              maxLength="9"
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              type="text"
              label="Marque"
              id="marque"
              v-model="marque"
              invalidFeedback="Remplissez le champ Marque"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              type="text"
              label="Modèle"
              id="modele"
              v-model="modele"
              invalidFeedback="Remplissez le champ Modèle"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
            />
          </MDBCol>
        </MDBRow>
        <MDBRow :class="$style.row">
          <MDBCol>
            <MDBInput
              type="text"
              label="Etat"
              id="etat"
              v-model="etat"
              invalidFeedback="Remplissez le champ Etat"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              type="number"
              label="Prix"
              id="prix"
              v-model="prix"
              invalidFeedback="Remplissez le champ Prix"
              validFeedback="Tout semble ok!"
              validationEvent="input"
              required
            />
          </MDBCol>
          <MDBCol>
            <label>Disponibilité &nbsp;</label>
            <MDBRadio
              label="true"
              value=true
              v-model="disponibilite"
              inline
              name="inlineRadioOptions"
            />
            <MDBRadio
              label="false"
              value=false
              v-model="disponibilite"
              inline
              name="inlineRadioOptions"
            />
          </MDBCol>
          <MDBCol>
            <div>Type du véhicule: {{ type }}</div>
            <select v-model="type">
              <option disabled value="">---type---</option>
              <option>voiture</option>
              <option>motocycle</option>
              <option>utilitaire</option>
              <option>camion</option>
            </select>
          </MDBCol>
        </MDBRow>
        <!-- Submit button -->
        <MDBBtn color="success" type="submit">Ajout du nouveau véhicule</MDBBtn>
      </form>
    </div>
  </div>
  <div v-if="!isEditing">
    <div :class="$style.searchDiv">
      <input
        :class="$style.searchBar"
        type="search"
        class="form-control"
        placeholder="Votre recherche"
        aria-label="Search"
        v-model="search"
      />
    </div>
  </div>

  <div v-if="this.search != ''">
    <MDBTable captionTop v-if="!isEditing" :class="$style.form">
      <caption :class="$style.form">
        <h1 :class="$style.titre">Tableau des véhicules</h1>
      </caption>
      <thead>
        <tr>
          <th scope="col">Immatriculation</th>
          <th scope="col">Marque</th>
          <th scope="col">Modèle</th>
          <th scope="col">Etat</th>
          <th scope="col">Prix(à la journée)</th>
          <th scope="col">Disponibilité</th>
          <th scope="col">Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="vehicule of vehicules"
          :key="vehicule.immatriculation"
          v-show="
            vehicule.immatriculation == this.search ||
            vehicule.modele == this.search ||
            vehicule.marque == this.search ||
            vehicule.etat == this.search ||
            vehicule.prix == this.search ||
            vehicule.disponibilite == this.search ||
            vehicule.type == this.search
          "
        >
          <th scope="row">{{ vehicule.immatriculation }}</th>
          <td>{{ vehicule.modele }}</td>
          <td>{{ vehicule.marque }}</td>
          <td>{{ vehicule.etat }}</td>
          <td>{{ vehicule.prix }}</td>
          <td>{{ vehicule.disponibilite }}</td>
          <td>{{ vehicule.type }}</td>
          <td>
            <MDBBtn color="warning">
              <router-link :to="{ name: 'Vehicule', params: { id: vehicule._id } }"
                >Modifier</router-link
              >
            </MDBBtn>
          </td>
          <td>
            <MDBBtn color="danger" @:click="removeItem(vehicule._id)">Supprimer</MDBBtn>
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </div>
  <div v-else>
    <MDBTable captionTop v-if="!isEditing" :class="$style.form">
      <caption :class="$style.form">
        <h1 :class="$style.titre">Tableau des véhicules</h1>
      </caption>
      <thead>
        <tr>
          <th scope="col">Immatriculation</th>
          <th scope="col">Marque</th>
          <th scope="col">Modèle</th>
          <th scope="col">Etat</th>
          <th scope="col">Prix(à la journée)</th>
          <th scope="col">Disponibilité</th>
          <th scope="col">Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicule of vehicules" :key="vehicule.immatriculation">
          <th scope="row">{{ vehicule.immatriculation }}</th>
          <td>{{ vehicule.modele }}</td>
          <td>{{ vehicule.marque }}</td>
          <td>{{ vehicule.etat }}</td>
          <td>{{ vehicule.prix }}</td>
          <td>{{ vehicule.disponibilite }}</td>
          <td>{{ vehicule.type }}</td>
          <td>
            <MDBBtn color="warning">
              <router-link :to="{ name: 'Vehicule', params: { id: vehicule._id } }"
                >Modifier</router-link
              >
            </MDBBtn>
          </td>
          <td>
            <MDBBtn color="danger" v-on:click="removeItem(vehicule._id)"
              >Supprimer</MDBBtn
            >
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </div>
</template>

<script>
// import des composants utilisés
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBRadio } from "mdb-vue-ui-kit";
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      // initialisation de variables
      vehicules: [],
      isEditing: false,
      selected: null,
      search: "",
    };
  },
  /*
   *méthode permettant de récupérer toutes les données des véhicules
   */
  async created() {
    try {
      const res = await axios.get(`http://localhost:5000/vehicules`);
      this.vehicules = res.data;
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
     *méthodes relatives à l'affichage conditionnel
     */
    show() {
      this.isEditing = true;
    },
    hide() {
      this.isEditing = false;
    },
    /*
     *méthode permettant d'ajouter un véhicule
     */
    async addVehicule() {
      const res = await axios.post(`http://localhost:5000/vehicules`, {
        id: this.id,
        immatriculation: this.immatriculation,
        modele: this.modele,
        marque: this.marque,
        etat: this.etat,
        prix: this.prix,
        disponibilite: this.disponibilite,
        type: this.type,
      });
      console.log(res);
      this.vehicules = [...this.vehicules, res.data];
      this.immatriculation = "";
      this.modele = "";
      this.marque = "";
      this.etat = "";
      this.prix;
      this.disponibilite = true;
      this.isEditing = false;
      this.$router.push("/home");
    },
    /*
     *méthode permettant de supprimer un véhicule en fonction de son id
     */
    removeItem(id) {
      axios.delete(`http://localhost:5000/vehicules/${id}`);
      this.vehicules = this.vehicules.filter((vehicule) => vehicule._id !== id);
    },
  },
  name: "Vehicules",
  components: {
    //composants utilisés
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBTable,
    MDBRadio,
  },
  setup() {
    //initialisation de variables
    const immatriculation = ref("");
    const modele = ref("");
    const marque = ref("");
    const etat = ref("");
    const prix = ref();
    const disponibilite = ref("true");
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
