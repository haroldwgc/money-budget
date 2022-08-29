<template>
    <h4>Ingresos</h4>
    <table class="table table-info table-striped">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in counterStore.operationList">
                <td>{{ item.name }}</td>
                <td><img src="https://img.icons8.com/carbon-copy/344/filled-trash.png" @click="deleted(item._id)"
                        class="img-fluid mx-auto" alt="..." style=" width:30px ; height: 30px; cursor:pointer;">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { watch } from 'vue';
import { Deleted, AxiosWatch, host, Alerta } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();

async function deleted(valor: any) {
    await Deleted(counterStore.operationList, valor, host + "/api/operation/" + counterStore.operationid);
    Alerta('Operación eliminada satisfactoriamente','danger')
}

watch(() => [counterStore.componentKey], (first, second) => {

    AxiosWatch(counterStore.operationList, host + "/api/operation/" + counterStore.operationid, false)

});
</script>