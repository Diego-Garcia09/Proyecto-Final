<template>
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>
      <v-toolbar-title>Apps Web</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item prepend-icon="mdi-home">
            <router-link :to="{ path: '/inicio', query: { token: token }}">Home</router-link>
          </v-list-item>
          <v-list-item prepend-icon="mdi-table">
            <router-link :to="{ path: '/donar', query: { token: token }}">Tablas</router-link>
          </v-list-item>
          <v-list-item prepend-icon="mdi-table">
            <router-link :to="{ path: '/personas', query: { token: token }}">Personas</router-link>
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
  console.log(token);
  </script>
  