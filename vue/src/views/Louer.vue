<style module>
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
  width: 70vw;
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
  <!-- <form :class="$style.form" @submit.prevent="addLocation()"> -->
  <form :class="$style.form">
    <h1 :class="[$style.titre, $style.form]">Commencer une location</h1>
    <div v-if="!isEditingVehicule">
      <h2 :class="$style.titre">Choix du véhicule</h2>
      <MDBRow :class="$style.row">
        <!-- ancienne façon sans l'utilisation d'un set -->
        <!-- <MDBCol>
          <div>Marque : {{ marque }}</div>
          <select v-model="marque">
            <option disabled value="">---type---</option>
            <option
              v-for="vehicule of vehicules"
              :key="vehicule._id"
              v-show="vehicule.disponibilite == true"
            >
              {{ vehicule.marque }}
            </option>
          </select>
        </MDBCol> -->
        <MDBCol>
          <div>Marque : {{ marque }}</div>
          <select v-model="marque">
            <option disabled value="">---type---</option>
            <option
              v-for="mark of marks"
              :key="mark"
            >
              {{ mark }}
            </option>
          </select>
        </MDBCol>
        <MDBCol>
          <div>Modèle : {{ modele }}</div>
          <select v-model="modele">
            <option disabled value="">---type---</option>
            <option
              v-for="vehicule of vehicules"
              :key="vehicule._id"
              v-show="vehicule.marque == marque && vehicule.disponibilite == true"
            >
              {{ vehicule.modele }}
            </option>
          </select>
        </MDBCol>
        <MDBCol>
          <div>Immatriculation : {{ immatriculation }}</div>
          <select v-model="immatriculation">
            <option disabled value="">---type---</option>
            <option
              v-for="vehicule of vehicules"
              :key="vehicule._id"
              v-show="
                vehicule.marque == marque &&
                vehicule.modele == modele &&
                vehicule.disponibilite == true
              "
            >
              {{ vehicule.immatriculation }}
            </option>
          </select>
        </MDBCol>
      </MDBRow>
      <MDBBtn color="success" @:click="getByImmatriculation(immatriculation)"
          v-if="immatriculation!=''">Je choisie ce véhicule</MDBBtn
        >
    </div>

    <MDBTable captionTop v-else :class="$style.form">
      <caption :class="$style.form">
        <h2 :class="$style.titre">Véhicule choisi</h2>
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
        <tr>
          <th scope="row">{{ vehiculechoisi.immatriculation }}</th>
          <td>{{ vehiculechoisi.modele }}</td>
          <td>{{ vehiculechoisi.marque }}</td>
          <td>{{ vehiculechoisi.etat }}</td>
          <td>{{ vehiculechoisi.prix }}</td>
          <td>{{ vehiculechoisi.disponibilite }}</td>
          <td>{{ vehiculechoisi.type }}</td>
        </tr>
      </tbody>
    </MDBTable>

    <div v-if="!isEditingLocataire">
      <MDBRow :class="$style.row">
        <h2 :class="$style.titre">Choix du locataire</h2>
        <MDBCol>
          <div>Nom du locataire : {{ nom }}</div>
          <select v-model="nom">
            <option disabled value="">---type---</option>
            <option v-for="locataire of locataires" :key="locataire.email">
              {{ locataire.nom }}
            </option>
          </select>
        </MDBCol>
        <MDBCol>
          <div>Email : {{ email }}</div>
          <select v-model="email">
            <option disabled value="">---type---</option>
            <option
              v-for="locataire of locataires"
              :key="locataire._id"
              v-show="locataire.nom == nom"
            >
              {{ locataire.email }}
            </option>
          </select>
        </MDBCol>
      </MDBRow>
      <MDBBtn color="success" @:click="getByEmail(email)" v-if="email!=''">Je choisie ce locataire</MDBBtn>
    </div>

    <MDBTable captionTop v-if="isEditingLocataire" :class="$style.form">
      <caption :class="$style.form">
        <h1 :class="$style.titre">Locataire choisi</h1>
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
        <tr>
          <th scope="row">{{ locatairechoisi._id }}</th>
          <td>{{ locatairechoisi.nom }}</td>
          <td>{{ locatairechoisi.prenom }}</td>
          <td>{{ locatairechoisi.email }}</td>
        </tr>
      </tbody>
    </MDBTable>

    <h2 :class="$style.titre">Choix des dates</h2>
    <MDBRow :class="$style.row">
      <MDBCol> <Datepicker v-model="date" range /></MDBCol>
    </MDBRow>
    <MDBBtn color="success" @:click="getPrice(date[0], date[1])"
    >calcul du prix pour les dates choisies</MDBBtn
    >
    <p v-if="this.totalprice > 0">Le prix de la location est : {{ this.totalprice }}</p>
    <MDBBtn color="success" @:click="addLocation(vehiculechoisi._id)" 
      >Valider la location</MDBBtn
    >
  </form>

  <MDBModal id="Modal" tabindex="-1" labelledby="ModalLabel" v-model="Modal">
    <MDBModalHeader>
      <MDBModalTitle id="ModalLabel"> Message d'erreur </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody
      >La date choisie et l'heure doivent être supérieur à ceux actuels</MDBModalBody
    >
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="Modal = false">Close</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTable,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-vue-ui-kit";
import { ref, onMounted } from "vue";
import axios from "axios";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// Lazy load the component we want to pass

export default {
  data() {
    return {
      vehicules: [],
      vehicule: "",
      locataires: [],
      locataire: "",
      selected: null,
      vehiculechoisi: "",
      locatairechoisi: "",
      isEditingVehicule: false,
      isEditingLocataire: false,
      isEditingDate: false,
      totalprice: 0,
      date: Date.now(),
      Modal: false,
      marques:[],
      marks: new Set,
    };
  },
  computed: {},
  watch: {},
  /*
   *méthode permettant de récupérer toutes les données des véhicules et locataires lors de la création de la page
   */
  async created() {
    try {
      // const res = await axios.get(`http://localhost:3000/vehicules`);
      const res1 = await axios.get(`http://localhost:5000/vehicules`);
      this.vehicules = res1.data;
      const res2 = await axios.get(`http://localhost:5000/locataires`);
      this.locataires = res2.data;
      //this.vehicules.forEach(v=>this.marques.push(v.marque));
      this.vehicules.forEach(v=>this.marks.add(v.marque));
      //console.log(this.marques);
      //console.log(this.marks);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /*
     *redirection vers la page de gestion des locations
     */
    goToLocations() {
      this.$router.push("/locations");
    },
    /*
     *méthode permettant d'ajouter une location
     */
    async addLocation(voitureid) {
      const res = await axios.post(`http://localhost:5000/locations`, {
        vehicule: this.vehiculechoisi,
        locataire: this.locatairechoisi,
        date_de_debut: this.date[0],
        date_de_fin: this.date[1],
        prix: this.totalprice,
      });
      console.log(res);
      this.update(voitureid);
      this.goToLocations();
    },
    /*
     *méthode permettant de récupérer un véhicule en fonction de son immatriculation
     */
    async getByImmatriculation(imma) {
      try {
        const res = await axios.get(`http://localhost:5000/vehicules/immatriculation/${imma}`);
        this.vehiculechoisi = res.data;
        console.log(this.vehiculechoisi);
      } catch (error) {
        console.log(error);
      }
      this.isEditingVehicule = true;
    },
    /*
     *méthode permettant de récupérer un locataire en fonction de son adresse email
     */
    async getByEmail(email) {
      try {
        const res = await axios.get(`http://localhost:5000/locataires/email/${email}`);
        this.locatairechoisi = res.data;
        console.log(this.locatairechoisi);
      } catch (error) {
        console.log(error);
      }
      this.isEditingLocataire = true;
    },
    /*
     *méthode permettant de calculer le nombre de jours de locations,
     * le prix total en fonction du prix journalier d'un véhicule
     * et qui vérifie si les dates sont valides
     */
    getPrice(start, end) {
      const date1 = new Date(start);
      const date2 = new Date(end);
      const time = date1.getTime();
      console.log(this.Modal);
      console.log(time);
      console.log(Date.now());
      if (time > Date.now()) {
        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;
        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();
        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);
        this.totalprice = diffInDays * this.vehiculechoisi.prix;
        this.isEditingDate = true;
      } else {
        this.Modal = true;
        console.log(this.Modal);
      }
    },
    /*
     *méthode qui permet de changer l'état de disponibilité d'un véhicule
     */
    async update(voitureid) {
      try {
        await axios
          .patch(`http://localhost:5000/vehicule/${voitureid}`, {
            disponibilite: false,
          })
          .then((response) => console.log(response));
      } catch (error) {
        console.error(error);
      }
    },
  },
  name: "Louer",
  components: {
    MDBRow,
    MDBCol,
    MDBBtn,
    Datepicker,
    MDBTable,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  },
  setup() {
    //vehicules
    const immatriculation = ref("");
    const modele = ref("");
    const marque = ref("");
    const etat = ref("");
    const prix = ref();
    const disponibilite = ref(true);
    const type = ref("");
    //locataires
    const nom = ref("");
    const prenom = ref("");
    const email = ref("");
    const password = ref("");
    //date
    const date = ref();
    onMounted(() => {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      date.value = [startDate, endDate];
    });

    return {
      //vehicules
      immatriculation,
      modele,
      marque,
      etat,
      prix,
      disponibilite,
      type,
      //locataires
      nom,
      prenom,
      email,
      password,
    };
  },
};
</script>
