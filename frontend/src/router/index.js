// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/inicio',
        name: 'Inicio',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Inicio.vue'),
      },
      {
        path: '/donar',
        name: 'Donar',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Donar.vue'),
      },
      {
        path: '/personas',
        name: 'Personas',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Personas.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
