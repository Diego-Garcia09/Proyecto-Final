<template>
    <v-data-table :headers="headers" :items="info" :sort-by="[{ key: 'id', order: 'asc' }]" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <!-- <v-toolbar-title>Mi CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer> -->
                <!-- <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" dark class="mb-2" v-bind="props">
                            New Item
                        </v-btn>
                    </template> -->
                <!-- <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title> -->

                <!-- <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.nombre" label="Autor"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.donatario" label="donatario"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text> -->

                <!-- <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save">
                                Save
                            </v-btn>
                        </v-card-actions> -->
                <!-- </v-card> -->
                <!-- </v-dialog> -->
                <!-- <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog> -->
            </v-toolbar>
        </template>
        <!-- <template v-slot:item.actions="{ item }">
            <v-icon size="small" class="me-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
                Reset
            </v-btn>
        </template> -->
    </v-data-table>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute();
const token = route.query.token;
const config = {
    headers: { Authorization: `Bearer ${token}` }
};


const headers = [
    {
        title: 'Nombre',
        align: 'start',
        sortable: false,
        key: 'nombre',
    },
    { title: 'Descripcion', key: 'desc' },
    { title: 'Donatario', key: 'donatario' },
    { title: 'Donadores', key: 'donadores' },
    { title: 'Actions', key: 'actions', sortable: false },
];

const initialize = async () => {
    await obtenerInfo();
    await obtenerUsuario();
    await mergedData();
}

// const posts = ref([]);
const proyectos = ref([]);
const personas = ref([]);
// const users = ref([]);

async function obtenerInfo() {
    const res = await axios.get('https://localhost:3000/proyectos', config);
    proyectos.value = res.data;
    console.log(proyectos.value);
}

async function obtenerUsuario() {
    const res = await axios.get('https://localhost:3000/personas', config);
    personas.value = res.data;
    console.log(personas.value);
}

async function mergedData() {
    const mergedPublicaciones = [];
    const mergedProyectos = [];
    mergedProyectos.push({
        id: proyectos.value[0].id,
        nombre: proyectos.value[0].nombre,
        desc: proyectos.value[0].descripcion,
        donatario: 'proyectos.value[0].donatarioId',
    });
    mergedProyectos.push({
        id: proyectos.value[1].id,
        nombre: proyectos.value[1].nombre,
        desc: proyectos.value[1].descripcion,
        donatario: 'proyectos.value[1].donatarioId',
    });
    console.log(mergedProyectos);
    info.value = mergedProyectos;
    //   info.value = mergedProyectos;

    //   for (const proyecto of proyectos.value) {
    //     const usuario = personas.value.find((u) => u.id === proyecto.userId);
    //     if (user) {
    //       mergedPublicaciones.push({
    //         id: proyecto.id,
    //         nombre: proyecto.nombre,
    //         desc: proyecto.desc,
    //         donatario: proyecto.donatario,
    //       });
    //     }
    //   }
    //   info.value = mergedPublicaciones;



    // for (const post of posts.value) {
    //     const user = users.value.find((u) => u.id === post.userId);
    //     if (user) {
    //         mergedPublicaciones.push({
    //             id: post.id,
    //             nombre: user.nombre,
    //             desc: post.desc,
    //             donatario: post.donatario,
    //         });
    //     }
    // }
    // info.value = mergedPublicaciones;
}

onMounted(() => {
    initialize();
});










const dialog = ref(false);
const dialogDelete = ref(false);

const info = ref([]);
const editedIndex = ref(-1);
const editedItem = reactive({
    id: 0,
    nombre: '',
    desc: 0,
    donatario: 0,
});
const defaultItem = {
    id: 0,
    nombre: '',
    desc: 0,
    donatario: 0,
};

const editItem = async (item) => {
    try {
        console.log(item);
        editedItem.id = item.id;
        editedItem.nombre = item.nombre;
        editedItem.desc = item.desc;
        editedItem.donatario = item.donatario;
        dialog.value = true;
        editedIndex.value = info.value.findIndex((d) => d.id === item.id);
    } catch (error) {
        console.log("Error al editar item")
    }
};

const save = async () => {
    if (editedIndex.value === -1) {
        const newItem = {
            desc: editedItem.desc.toString(),
            donatario: editedItem.donatario.toString(),
            userId: editedItem.id,
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            donatario: JSON.stringify(newItem),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const jsonResponse = await response.json();

            info.value.push({
                id: jsonResponse.id,
                nombre: editedItem.nombre,
                desc: editedItem.desc,
                donatario: editedItem.donatario,
            });

            close();
        } else {
            console.error('Error al agregar el elemento');
        }
    } else {
        const editedDessert = {
            id: editedIndex.value,
            desc: editedItem.desc.toString(),
            donatario: editedItem.donatario.toString(),
            userId: editedItem.id,
        };

        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${parseInt(editedIndex.value) + 1}`, {
            method: 'PUT',
            donatario: JSON.stringify({
                userId: editedDessert.userId,
                id: editedDessert.id,
                desc: editedDessert.desc,
                donatario: editedDessert.donatario,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const jsonResponse = await response.json();

            const index = editedIndex.value;
            info.value[index] = {
                id: jsonResponse.id,
                nombre: editedItem.nombre,
                desc: editedItem.desc,
                donatario: editedItem.donatario,
            };

            close();
        } else {
            console.error('Error al editar el elemento');
        }
    }
};

const deleteItem = async (item) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const index = info.value.findIndex((d) => d.id === item.id);
            if (index !== -1) {
                info.value.splice(index, 1);
            }

            closeDelete();
        } else {
            console.error('Error al eliminar el elemento');
        }
    } catch (error) {
        console.error('Error al eliminar el elemento', error);
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

const closeDelete = () => {
    dialogDelete.value = false;
    editedItem.value = { ...defaultItem };
    editedIndex.value = -1;
};

watch(dialog, (val) => {
    val || close();
});

watch(dialogDelete, (val) => {
    val || closeDelete();
});

</script>