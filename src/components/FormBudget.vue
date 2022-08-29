<template>
    <h3 class="fw-bold text-uppercase">Insertar Item de Presupuesto: {{ counterStore.operationName }}</h3>

    <p></p>
    <div class="form-floating">
        <select v-model="budgetRequest.type" class="form-select" id="waypay" aria-label="Floating label select example">
            <option value="Fijo No Variable">Fijo No Variable</option>
            <option value="Fijo Variable">Fijo Variable</option>
            <option value="Ahorro">Ahorro</option>
            <option value="No Escenciales">No Escenciales</option>
        </select>
        <label for="waypay">Medio de pago</label>
    </div>
    <p></p>
    <div class="form-floating">
        <select v-model="budgetRequest.idCategory" class="form-select" id="floatingSelect"
            aria-label="Floating label select example">
            <option v-for="list in counterStore.categoryList" :value="list.name + '|' + list.icon">{{ list.name }}
            </option>
        </select>
        <label for="floatingSelect">Categoria</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="text" v-model="budgetRequest.amount" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">Monto Presupuestado</label>
    </div>

    <p></p>
    <button type="button" @click="insertar()" class="btn btn-success">Guardar</button>
    <p></p>
</template>
<script lang="ts" setup>
import { watch } from 'vue';
import Send, { Alerta, AxiosWatch, host } from '../js/helpers';
import BudgetRequest from '../models/request/BudgetRequest';
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();
let budgetRequest: BudgetRequest = new BudgetRequest();


async function insertar() {
    budgetRequest.idOperation = counterStore.operationid;

    await Send(budgetRequest, host + "/api/budget");

    Alerta('Item de presupuesto creado satisfactoriamente','success')
}


watch(() => [counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.budgetList, host + "/api/budget/byIdOperation/", true)
});

</script>