<template>
    <h3 class="fw-bold text-uppercase">Insertar Usuario</h3>
     <p></p>
    <div class="form-floating">
        <input type="text" v-model="userRequest.name" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">Nombre</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="text" v-model="userRequest.user" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">user</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="text" v-model="userRequest.mail" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">correo</label>
    </div>
  <p></p>
   <div class="form-floating">
        <input type="text" v-model="userRequest.password" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">Contraseña</label>
    </div>
    <p></p>
    <button type="button" @click="insertar()" class="btn btn-success">Guardar</button>
    <p></p>
</template>
<script lang="ts" setup>
import Send, { host } from '../js/helpers';
import UserRequest from '../models/request/UserRequest';
import router from '../routes';
let userRequest: UserRequest = new UserRequest();


async function insertar() {

    await Send(userRequest, host + "/api/user");
    router.push("/")
}



</script>