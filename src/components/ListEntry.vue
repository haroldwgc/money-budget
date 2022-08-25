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
                <td>{{formatter.format(item.amount) }}</td>
                <td>{{ new Date(item.created).toLocaleDateString() }}</td>
                <td></td>
                
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts" setup>
import { Formater } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
var formatter = Formater()

</script>