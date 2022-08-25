<template>
    <h3 class="fw-bold text-uppercase">Insertar operación: {{ counterStore.operationName }}</h3>

    <div class="form-floating">
        <input type="text" v-model="operationModel.name" class="form-control" placeholder="Leave a comment here"
            id="name">
        <label for="name">Nombre de operación</label>
    </div>
    <p></p>
    <p></p>
    <button type="button" @click="insertar()" class="btn btn-primary">Guardar</button>
    <p></p>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { watch } from 'vue';
import OperationModels from '../models/OperationModel';
import { useCounterStore } from '../stores/counter';
import Send, { AxiosWatch, host } from '../js/helpers';
const counterStore = useCounterStore();
let operationModel: OperationModels = new OperationModels();

async function insertar() {
    operationModel.idUser=counterStore.userId;
    await Send(operationModel, host+"/api/operation");
}

watch(() => [counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.operationList, host+"api/operationByUser/"+counterStore.userId, false)
});

</script>