<template>
    <v-container>
            <v-card-title class="text-center">
                Formulario de Donación
            </v-card-title>
            <v-spacer></v-spacer>
                <v-form @submit.prevent="submitDonation">
                    <v-row>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-text-field :style="{ 'max-width': '400px', width: '100%' }" v-model="fullName"
                                label="Nombre completo"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-text-field :style="{ 'max-width': '400px', width: '100%' }" v-model="rfc"
                                label="RFC"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-text-field :style="{ 'max-width': '400px', width: '100%' }" v-model="email"
                                label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-text-field :style="{ 'max-width': '200px', width: '100%' }" v-model="amount"
                                label="Monto a donar"></v-text-field>
                        </v-col>
                        <v-col class="text-center">
                            <v-btn type="submit" color="primary">Realizar Donación</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
    </v-container>
</template>
  
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router'

const fullName = ref('');
const rfc = ref('');
const email = ref('');
const amount = ref(0);
const route = useRoute();
const token = route.query.token;
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const submitDonation = async () => {
    const checkRFC = await axios.get(`https://localhost:3000/personas/rfc/${rfc.value}`, config);
    const checkEmail = await axios.get(`https://localhost:3000/personas/email/${email.value}`, config);

    if(checkRFC.data.length==0 & checkEmail.data.length==0)
    {
        const creacionPersona = await axios.post(`https://localhost:3000/personas/${fullName.value}/${email.value}/${rfc.value}`, config);
        const donacion = await axios.post(`https://localhost:3000/donadores/1/${rfc.value}`, config);
    }
    else
    {
        console.log("Error");
    }
};
</script>
