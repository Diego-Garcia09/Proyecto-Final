<template>
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
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.descripcion" label="Descripcion"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.donatarioId" label="Donatario"></v-text-field>
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



                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>




                <v-dialog v-model="donadoresDialog" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Donadores</v-card-title>
                        <v-card-text>
                            <v-list>
                                <v-list-item v-for="(donador, index) in donadores" :key="index">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Nombre: {{ donador.nombre }}, Donación: {{ donador.donacion }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDonadoresDialog">Cerrar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>



            </v-toolbar>
        </template>
        <template v-slot:item.donadores="{ item }">
            <v-btn size="small" class="me-2" @click="showDonadores(item)">
                Ver donadores
            </v-btn>
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
    { title: 'Descripcion', key: 'descripcion', sortable: true },
    { title: 'Donatario', key: 'donatario', sortable: true },
    { title: 'Donadores', key: 'donadores', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
]

const donadoresDialog = ref(false);
const donadores = ref([]);

const showDonadores = async (item) => {
    // Lógica para obtener los donadores asociados al 'item'
    // Supongamos que 'item.donadores' es un arreglo con los nombres de los donadores
    const res = await axios.get(`https://localhost:3000/donadores/${item.id}/proyecto`, config);
    const personasRes = await axios.get(`https://localhost:3000/personas`, config);

    const donations = res.data;
    const personas = personasRes.data;
    console.log(personas);

    const donadoresList = [];

    donations.forEach((donador) => {

        const personaRelacionada = personas.find((persona) => persona.id === donador.personaId);
        // console.log(personaRelacionada);
        donadoresList.push({
            nombre: personaRelacionada.nombre,
            donacion: donador.donacion
        });
    });
    console.log(donadores);
    donadores.value = donadoresList;
    donadoresDialog.value = true;
};

const closeDonadoresDialog = () => {
    // Cerrar la ventana emergente de donadores
    donadoresDialog.value = false;
    // Limpiar la lista de donadores cuando se cierre la ventana emergente
    donadores.value = [];
};
const info = ref([]);
const route = useRoute();
const token = route.query.token;
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const obtenerInfo = async () => {
    const res = await axios.get('https://localhost:3000/proyectos', config);
    const resp = await axios.get('https://localhost:3000/personas', config);
    console.log(res.data);
    console.log(resp.data);
    const proyectos = res.data;
    const personas = resp.data;

    const personasMap = new Map();
    personas.forEach(persona => {
        personasMap.set(persona.id, persona.nombre);
    });

    const infoMerged = proyectos.map(proyecto => {
        return {
            ...proyecto,
            donatario: personasMap.get(proyecto.donatarioId)
        };
    });

    console.log(infoMerged);
    info.value = infoMerged;
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
    descripcion: '',
    donatarioId: 0,
});
const defaultItem = {
    id: 0,
    nombre: '',
    descripcion: '',
    donatarioId: 0,
};

const editItem = async (item) => {
    try {
        console.log(item);
        editedItem.id = item.id;
        editedItem.nombre = item.nombre;
        editedItem.descripcion = item.descripcion;
        editedItem.donatarioId = item.donatarioId;
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
            descripcion: editedItem.descripcion.toString(),
            donatarioId: editedItem.donatarioId,
        };
        const proyecto = {
            nombre: newItem.nombre,
            descripcion: newItem.descripcion,
            donatarioId: newItem.donatarioId,
        };
        console.log("Esto es lo que se envia a crear: ", proyecto);
        const res = await axios.post(`https://localhost:3000/proyectos/`, proyecto, config);
        console.log(res);
        if (res.data.success == true) {
            const donatario = await axios.get(`https://localhost:3000/personas/`, config);
            console.log(donatario);
            const donatarioName = donatario.data.find(persona => persona.id === parseInt(res.data.proyecto.donatarioId));
            console.log(donatarioName);
            info.value.push({
                id: res.data.proyecto.id,
                nombre: editedItem.nombre,
                descripcion: editedItem.descripcion,
                donatario: donatarioName.nombre,
            });
            close();
        }
        else {
            console.log("Error al agregar proyecto");
        }
    } else {
        const editedDessert = {
            id: editedItem.id,
            nombre: editedItem.nombre.toString(),
            descripcion: editedItem.descripcion.toString(),
            donatarioId: editedItem.donatarioId,
        };
        const proyecto = {
            id: editedDessert.id,
            nombre: editedDessert.nombre,
            descripcion: editedDessert.descripcion,
            donatarioId: editedDessert.donatarioId,
        };
        console.log("Este es el proyecto a editar: ", proyecto)
        try {
            const res = await axios.put(`https://localhost:3000/proyectos/${proyecto.id}`, proyecto, config);
            console.log(res);
            if (res.data.success == true) {
                const donatario = await axios.get(`https://localhost:3000/personas/`, config);
                console.log(donatario);
                const donatarioName = donatario.data.find(persona => persona.id === parseInt(res.data.proyecto.donatarioId));
                console.log(donatarioName);
                const index = editedIndex.value;
                info.value[index] = {
                    id: editedItem.id,
                    nombre: editedItem.nombre,
                    descripcion: editedItem.descripcion,
                    donatario: donatarioName.nombre,
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




const deleteItem = (item) => {
    editedIndex.value = info.value.indexOf(item);
    editedItem.id = item.id;
    dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
    try {
        const res = await axios.delete(`https://localhost:3000/proyectos/${editedItem.id}`, config);
        if (res.data.success === true) {
            info.value.splice(editedIndex.value, 1);
            closeDelete();
        } else {
            console.error('Error al eliminar el elemento');
        }
    } catch (error) {
        console.error('Error al eliminar el elemento', error);
    }
};

const closeDelete = () => {
    dialogDelete.value = false;
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
};
watch(dialogDelete, (val) => {
    val || closeDelete();
});

</script>