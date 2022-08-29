<template>
    <h3 class="fw-bold text-uppercase">Insertar Categoria</h3>

    <div class="form-floating">
        <input type="text" v-model="categoryRequest.name" class="form-control" placeholder="Leave a comment here"
            id="name">
        <label for="name">Nombre Categoria</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="text" v-model="categoryRequest.description" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">Descripción</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="text" v-model="categoryRequest.icon" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">Icono</label>
    </div>
    <p></p>
    <button type="button" @click="insertar()" class="btn btn-success">Guardar</button>
    <p></p>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { watch } from 'vue';
import Send, { Alerta, AxiosWatch, host } from '../js/helpers';
import CategoryRequest from '../models/request/CategoryRequest';
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();
let categoryRequest: CategoryRequest = new CategoryRequest();


async function insertar() {
    await Send(categoryRequest, host + "/api/category");
    Alerta('categoria creada satisfactoriamente','success')
}

watch(() => [counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.categoryList, host + "/api/category", false)
});

</script>