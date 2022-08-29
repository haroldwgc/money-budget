<template>
    <h3 class="fw-bold text-uppercase">Insertar ingreso: {{ counterStore.operationName }}</h3>

    <div class="form-floating">
        <input type="text" v-model="entryModel.name" class="form-control" placeholder="Leave a comment here" id="name">
        <label for="name">Nombre Ingreso</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="text" v-model="entryModel.amount" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">Valor</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="date" v-model="entryModel.created" class="form-control" placeholder="Leave a comment here"
            id="Date">
        <label for="Date">Fecha Gasto</label>
    </div>
    <p></p>
    <button type="button" @click="insertar()" class="btn btn-success">Guardar</button>
    <p></p>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { watch } from 'vue';
import Send, { Alerta, AxiosWatch, host } from '../js/helpers';
import EntryModel from '../models/EntryModel';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
let entryModel: EntryModel = new EntryModel();


async function insertar() {
    entryModel.idOperation = counterStore.operationid
    entryModel.name = entryModel.name;
    await Send(entryModel, host+"/api/entry");
    Alerta('Entrada creada satisfactoriamente','success')
}

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.entryList, host+"/api/entry/", true)
});


</script>