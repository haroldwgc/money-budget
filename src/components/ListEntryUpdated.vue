<template>
    <h4>Ingresos</h4>
    <table class="table table-success table-striped">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Monto</th>
                <th scope="col">Fecha</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in counterStore.entryList">
                <td>{{ item.name }}</td>
                <td>{{ formatter.format(item.amount) }}</td>
                <td>{{ new Date(item.created).toLocaleDateString() }}</td>
                <td><img src="https://img.icons8.com/carbon-copy/344/filled-trash.png" @click="deleted(item._id)"
                        class="img-fluid mx-auto" alt="..." style=" width:30px ; height: 30px; cursor:pointer;">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { Deleted, Formater, AxiosWatch, host, Alerta } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();

var formatter = Formater()
async function deleted(valor: any) {
    await Deleted(counterStore.entryList,valor, host+"/api/entry/");
    Alerta('Entrada eliminada satisfactoriamente','danger')
}

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.entryList, host+"/api/entry/byIdOperation/", true)
});

</script>