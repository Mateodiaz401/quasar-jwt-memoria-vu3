<template>
  <q-page padding="">
    <!-- <q-btn @click="userStore.access">Ingresar </q-btn> -->
    <q-btn @click="createLink">Crear Link</q-btn>
    <!-- <q-btn @click="userStore.logout"> cerrar Sesión</q-btn> -->
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore();
// userStore.refreshToken();
const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + userStore.token,
      },
      data: {
        longLink: "https://axios-http.com/docs/req_config",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(`mensage de error: ${message.error}`);
  }
};
</script>
