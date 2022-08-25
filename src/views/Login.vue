<template>

  <div class="position-absolute top-50 start-50 translate-middle" style="width: 400px;">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input type="text" class="form-control" placeholder="Username" v-model="usetRequest.user"  aria-label="Username"
        aria-describedby="basic-addon1">
    </div>
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputPassword">**</span>
        <input type="password" class="form-control" placeholder="Password" v-model="usetRequest.password" aria-describedby="inputPassword1">
      </div>
    </div>
    <button type="button" @click="login" class="btn btn-primary btn-sm">Entrar</button>
    <a  @click="register" style="cursor:pointer;">   Registrar</a>
  </div>
</template>

<script lang="ts" setup>
import {  Login } from '../js/helpers';
import UserRequest from '../models/request/UserRequest';
import router from '../routes';
const usetRequest=new UserRequest()
function login(){
Login(usetRequest);
}
function register(){
router.push("/register")
}
</script>