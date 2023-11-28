<template>
    <Barra />
    <v-data-table :headers="headers" :items="info" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Mi CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" dark class="mb-2" v-bind="props">
                            New Item
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <!-- <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                                    </v-col> -->
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.rfc" label="RFC"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" class="me-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Barra from '@/components/Barra.vue'
const headers = [
    { title: 'ID', sortable: true, key: 'id' },
    { title: 'Nombre', align: 'start', sortable: true, key: 'nombre' },
    { title: 'E-mmail', key: 'email', sortable: true },
    { title: 'RFC', key: 'rfc', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
]
const info = ref([]);
const route = useRoute();
const token = route.query.token;
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const obtenerInfo = async () => {
    const res = await axios.get('https://localhost:3000/personas', config);
    console.log(res.data);
    info.value = res.data;
}

const initialize = async () => {
    await obtenerInfo();
}

onMounted(() => {
    initialize();
});

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = reactive({
    id: 0,
    nombre: '',
    email: '',
    rfc: 0,
});
const defaultItem = {
    id: 0,
    nombre: '',
    email: '',
    rfc: 0,
};

const editItem = async (item) => {
    try {
        console.log(item);
        editedItem.id = item.id;
        editedItem.nombre = item.nombre;
        editedItem.email = item.email;
        editedItem.rfc = item.rfc;
        dialog.value = true;
        editedIndex.value = info.value.findIndex((d) => d.id === item.id);
    } catch (error) {
        console.log("Error al editar item")
    }
};

const save = async () => {
    if (editedIndex.value === -1) {
        const newItem = {
            nombre: editedItem.nombre.toString(),
            email: editedItem.email.toString(),
            rfc: editedItem.rfc,
        };

        const checkRFC = await axios.get(`https://localhost:3000/personas/rfc/${newItem.rfc.value}`, config);
        const checkEmail = await axios.get(`https://localhost:3000/personas/email/${newItem.email.value}`, config);
        if (checkRFC.data.length == 0 & checkEmail.data.length == 0) {
            const res = await axios.post(`https://localhost:3000/personas/${newItem.nombre}/${newItem.email}/${newItem.rfc}`, config);
            if (res.data.success == true) {
                info.value.push({
                    id: res.data.persona.id,
                    nombre: editedItem.nombre,
                    email: editedItem.email,
                    rfc: editedItem.rfc,
                });
                close();
            }
            else
            {
                console.log("Error al agregar persona");
            }
        }
        else {
            console.log("Error");
        }
    } else {
        const editedDessert = {
            id: editedIndex.value + 1,
            nombre: editedItem.nombre.toString(),
            email: editedItem.email.toString(),
            rfc: editedItem.rfc,
        };
        const persona = {
            id: editedDessert.id,
            nombre: editedDessert.nombre,
            email: editedDessert.email,
            rfc: editedDessert.rfc
        };
        console.log("Esta es la persona a editar: ", persona)
        try {
            const res = await axios.put(`https://localhost:3000/personas/${persona.id}`, persona, config);
            console.log(res);
            if (res.data.success == true) {
                const index = editedIndex.value;
                info.value[index] = {
                    id: res.data.id,
                    nombre: editedItem.nombre,
                    email: editedItem.email,
                    rfc: editedItem.rfc,
                };
                close();
            } else {
                console.error('Error al editar el elemento');
            }
        } catch (error) {
            console.log("Datos inválidos")
            dialog.value = false;
            editedIndex.value = -1;
            return;
        }
    }
};

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item';
});

const close = () => {
    dialog.value = false;
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
};

watch(dialog, (val) => {
    val || close();
});

</script>