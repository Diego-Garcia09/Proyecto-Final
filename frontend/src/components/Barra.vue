<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>
    <v-toolbar-title>Apps Web</v-toolbar-title>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
        <v-list-item prepend-icon="mdi-home">
          <router-link :to="{ path: '/inicio', query: { token: token } }">Inicio</router-link>
        </v-list-item>
        <v-list-item prepend-icon="mdi-cash-100">
          <router-link :to="{ path: '/donar', query: { token: token } }">Donar</router-link>
        </v-list-item>
        <v-list-item prepend-icon="mdi-projector-screen-outline">
          <router-link :to="{ path: '/proyectos', query: { token: token } }">Administrar proyectos</router-link>
        </v-list-item>
        <v-list-item prepend-icon="mdi-account">
          <router-link :to="{ path: '/personas', query: { token: token } }">Administrar personas</router-link>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const drawer = ref(false);
const group = ref(null);
const route = useRoute();
const token = route.query.token;
</script>
  