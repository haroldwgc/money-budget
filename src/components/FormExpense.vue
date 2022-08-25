<template>
    <h3 class="fw-bold text-uppercase">Insertar gasto: {{counterStore.operationName}}</h3>

    <div class="form-floating">
        <input type="text" v-model="expenseModel.name" class="form-control" placeholder="Leave a comment here"
            id="name">
        <label for="name">Nombre gasto</label>
    </div>
    <p></p>
    <div class="form-floating">
        <select v-model="expenseModel.nameCategory" class="form-select" id="floatingSelect"
            aria-label="Floating label select example">
            <option v-for="list in counterStore.categoryList" :value="list.name + '|' + list.icon">{{ list.name }}
            </option>
        </select>
        <label for="floatingSelect">Categoria</label>
    </div>
    <p></p>
    <div class="form-floating">
        <select v-model="expenseModel.type" class="form-select" id="waypay" aria-label="Floating label select example">
            <option value="Fijo No Variable">Fijo No Variable</option>
            <option value="Fijo Variable">Fijo Variable</option>
            <option value="Ahorro">Ahorro</option>
            <option value="No Escenciales">No Escenciales</option>
        </select>
        <label for="waypay">Medio de pago</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="text" v-model="expenseModel.amount" class="form-control" placeholder="Leave a comment here"
            id="amount">
        <label for="amount">Valor</label>
    </div>
    <p></p>
    <div class="form-floating">
        <input type="date" v-model="expenseModel.dateAmount" class="form-control" placeholder="Leave a comment here"
            id="Date">
        <label for="Date">Fecha Gasto</label>
    </div>
    <p></p>
    <button type="button" @click="insertar()" class="btn btn-success">Guardar</button>
    <p></p>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import Send, { AxiosWatch, host } from '../js/helpers';
import ExpenseRequest from '../models/request/ExpenseRequest';
import { useCounterStore } from '../stores/counter';


const counterStore = useCounterStore();
let expenseModel: ExpenseRequest = new ExpenseRequest();


async function insertar() {
    expenseModel.idOperation = counterStore.operationid
    expenseModel.iconCategory = expenseModel.nameCategory.split("|")[1];
    expenseModel.nameCategory = expenseModel.nameCategory.split("|")[0];
    await Send(expenseModel, host+"/api/expense");   
}


watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    AxiosWatch( counterStore.expenseList,host+"/api/expense/byIdOperation/", true)
    AxiosWatch( counterStore.totalBudgetList,host+"/api/budgetByExpense", false)
});

</script>