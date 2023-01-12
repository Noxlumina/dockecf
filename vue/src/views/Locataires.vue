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
    <MDBBtn color="success" @click="show" v-if="!isEditing">Ajouter un locataire</MDBBtn>
    <div v-else>
      <MDBBtn color="danger" @click="hide">Fermer le formulaire</MDBBtn>
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
        <h1 :class="$style.titre">Tableau des locataires</h1>
      </caption>
      <thead>
        <tr>
          <th scope="col" :class="$style.tableBorder">#locataire</th>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="locataire of locataires"
          :key="locataire._id"
          v-show="
            locataire.nom == this.search ||
            locataire.prenom == this.search ||
            locataire._id == this.search ||
            locataire.email == this.search
          "
        >
          <th scope="row">{{ locataire._id }}</th>
          <td>{{ locataire.nom }}</td>
          <td>{{ locataire.prenom }}</td>
          <td>{{ locataire.email }}</td>
          <td>
            <MDBBtn color="warning">
              <router-link :to="{ name: 'Locataire', params: { id: locataire._id } }"
                >Modifier</router-link
              >
            </MDBBtn>
          </td>
          <td>
            <MDBBtn color="danger" v-on:click="removeItem(locataire._id)"
              >Supprimer</MDBBtn
            >
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </div>

  <div v-else>
    <MDBTable captionTop v-if="!isEditing" :class="$style.form">
      <caption :class="$style.form">
        <h1 :class="$style.titre">Tableau des locataires</h1>
      </caption>
      <thead>
        <tr>
          <th scope="col" :class="$style.tableBorder">#locataire</th>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="locataire of locataires" :key="locataire._id">
          <th scope="row">{{ locataire./*id*/ _id }}</th>
          <td>{{ locataire.nom }}</td>
          <td>{{ locataire.prenom }}</td>
          <td>{{ locataire.email }}</td>
          <td>
            <MDBBtn color="warning">
              <router-link :to="{ name: 'Locataire', params: { id: locataire._id } }"
                >Modifier</router-link
              >
            </MDBBtn>
          </td>
          <td>
            <MDBBtn color="danger" v-on:click="removeItem(locataire._id)"
              >Supprimer</MDBBtn
            >
          </td>
        </tr>
      </tbody>
    </MDBTable>
  </div>
  <router-view />
</template>

<script>
// import des composants utilisés
import { MDBBtn, MDBTable, MDBRow, MDBCol, MDBInput } from "mdb-vue-ui-kit";
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
        const res = await axios.post(`http://localhost:5000/locataires`, {
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
      axios.delete(`http://localhost:5000/locataires/${id}`);
      this.locataires = this.locataires.filter((locataire) => locataire._id !== id);
    },
  },
  name: "Locataires",
  components: {
    //composants utilisés
    MDBTable,
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
