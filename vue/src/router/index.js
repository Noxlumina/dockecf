import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Locataires from '../views/Locataires.vue'
import Locations from '../views/Locations.vue'
import Vehicules from '../views/Vehicules.vue'
import Louer from '../views/Louer.vue'
const NotFound = { template: "<p>not found</p>" };



// routes du router
const routes = [{
  path: "/:catchAll(.*)",
  component: NotFound,
},
{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/locataires',
  name: 'Locataires',
  component: Locataires,
},
{
  path: '/locataire/:id',
  name: 'Locataire',
  component: () => import('../views/Locataire'),
  props: true
},
{
  path: '/vehicule/:id',
  name: 'Vehicule',
  component: () => import('../views/Vehicule'),
  props: true
},
{
  path: '/locations',
  name: 'Locations',
  component: Locations
},
{
  path: '/vehicules',
  name: 'Vehicules',
  component: Vehicules
},
{
  path: '/louer',
  name: 'Louer',
  component: Louer
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
