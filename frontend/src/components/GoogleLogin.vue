<template>
    <v-card title="Login" text="..." variant="tonal" elevation='8' max-width="344" class="mx-auto">
        <GoogleLogin :callback="handleGoogleResponse" />
    </v-card>
</template>
  
<script>
import axios from 'axios'
export default {
    methods: {
        async handleGoogleResponse(response) {
            try {
                const res = await axios.post('https://localhost:3000/login', {
                    token: response.credential,
                });
                if (res.data.message == 'Verificado') {
                    this.$router.push(`/inicio?token=${res.data.token}`);
                }
                else {
                    console.log("error");
                }
            } catch (error) {
                console.error('Error al enviar el token al backend:', error);
            }
        },
    },
};
</script>