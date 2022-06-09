import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Module from '../views/Module.vue'
import Exercise from '../views/Exercise.vue'
import Test from '../views/Test.vue'
import Profile from '../views/Profile.vue'

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
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/module/:id',
    name: 'Module',
    component: Module,
  },
  {
    path: '/exercise-memory',
    name: 'Memory-Exercise',
    component: Exercise,
  },
  {
    path: '/exercise-hangman',
    name: 'Hangman-Exercise',
    component: Exercise,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  }
]

//console.log(import.meta.env.BASE_URL);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
