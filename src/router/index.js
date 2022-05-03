import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Module from '../views/Module.vue'
import Exercise from '../views/Exercise.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/module/:id',
    name: 'Module',
    component: Module,
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: Exercise,
  },
]

//console.log(import.meta.env.BASE_URL);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
