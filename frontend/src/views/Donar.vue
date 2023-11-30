<template>
    <Barra />
    <div class="d-flex justify-center">
        <v-overlay v-model="showOverlay" absolute scroll-strategy="block" class="align-center justify-center">
            <v-card class="pa-4" elevation="12">
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
                            <v-btn @click="cancelDonation" color="error">Cancelar</v-btn>
                        </v-col>
                        <v-col class="text-center">
                            <v-btn type="submit" color="primary">Realizar Donación</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-overlay>
        <v-table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Donar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proyecto in proyectos" :key="proyecto.id">
                    <td>{{ proyecto.id }}</td>
                    <td>{{ proyecto.nombre }}</td>
                    <td>{{ proyecto.descripcion }}</td>
                    <td>
                        <v-btn @click="showDonationOverlay(proyecto.id)" color="primary">Donar</v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
  
<script setup>
import Barra from '@/components/Barra.vue'
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'

const proyectoDonar = ref(null);
const showOverlay = ref(false);
const showDonationType = ref(null);
const fullName = ref('');
const rfc = ref('');
const email = ref('');
const amount = ref(0);
const route = useRoute();
const token = route.query.token;
const proyectos = ref([]);

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const getProyectos = async () => {
    const res = await axios.get(`https://localhost:3000/proyectos/`, config);
    proyectos.value = res.data;
    console.log(res);
}

const submitDonation = async () => {
    console.log('Nombre Completo:', fullName.value);
    console.log('RFC:', rfc.value);
    console.log('Email:', email.value);
    console.log('Monto a Donar:', amount.value);
    console.log(proyectoDonar.value);
    const checkRFC = await axios.get(`https://localhost:3000/personas/rfc/${rfc.value}`, config);
    const checkEmail = await axios.get(`https://localhost:3000/personas/email/${email.value}`, config);
    const checkName = await axios.get(`https://localhost:3000/personas/nombre/${email.value}/${rfc.value}`, config);
    console.log(checkName);
    if (checkRFC.data.length == 0 & checkEmail.data.length == 0) {
        console.log("Creare a la persona");
        const donacion = {
            proyectoId: proyectoDonar.value,
            personaId: rfc.value,
            donacion: amount.value
        }
        const creacionPersona = await axios.post(`https://localhost:3000/personas/${fullName.value}/${email.value}/${rfc.value}`, config);
        const crearDonacion = await axios.post(`https://localhost:3000/donadores/`, donacion, config);
        console.log(crearDonacion);
    }
    else {
        if (checkRFC.data.length !== 0 && checkEmail.data.length !== 0 && checkName.data[0].nombre == fullName.value) {
            const checkDonadoresExist = await axios.get(`https://localhost:3000/donadores/${checkRFC.data[0].id}/persona`, config);
            console.log(checkDonadoresExist);
            const donacion = {
                proyectoId: proyectoDonar.value,
                personaId: rfc.value,
                donacion: amount.value
            }
            if (checkDonadoresExist.data.length == 0) {
                await axios.post(`https://localhost:3000/donadores/`, donacion, config);
            }
            else
            {
                console.log("Se donará con esa persona existente.");
                const res = await axios.put(`https://localhost:3000/donadores/${proyectoDonar.value}`, donacion, config);
                console.log(res);
            }
            // Realizar la donación con la persona existente (código adicional necesario)
        } else {
            console.log("Algun campo ya existe");
        }
    }
    fullName.value = '';
    rfc.value = '';
    email.value = '';
    amount.value = 0;
    showOverlay.value = false;
};

const cancelDonation = () => {
    // Reiniciar los valores de los campos del formulario
    fullName.value = '';
    rfc.value = '';
    email.value = '';
    amount.value = 0;

    // Cerrar el overlay
    showOverlay.value = false;
};

const showDonationOverlay = (projectId) => {
    showOverlay.value = true;
    showDonationType.value = 'donacion1'; // O 'donacion2' dependiendo de tu lógica
    console.log(`Donando al proyecto con ID: ${projectId}`);
    proyectoDonar.value = projectId;
};
onMounted(() => {
    getProyectos();
});
</script>
