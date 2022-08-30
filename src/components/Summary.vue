<template>

   <h3>{{ counterStore.operationName }}</h3>
   <p></p>
   <div class="shadow-lg p-3 mb-5 bg-body rounded">

      <div class="row">
         <div>
            <span class="fw-bold text-uppercase">Total ingresos: </span><span class="text-success fw-bold">{{
                  formatter.format(counterStore.totalEntry)
            }}</span>
         </div>
         <div>
            <span class="fw-bold text-uppercase">Total gastos: </span><span class="text-warning fw-bold">{{
                  formatter.format(counterStore.totalExpense)
            }}</span>
         </div>
         <div>
            <span class="fw-bold text-uppercase">Sobrante: </span><span class="fw-bold"
               :style="[counterStore.restAmount < 0 ? { color: 'red' } : { color: 'green' }]">{{
                     formatter.format(counterStore.restAmount)
               }}</span>
         </div>
      </div>
   </div>
   <div>
      <h4>Presupuesto: {{ counterStore.operationName }}</h4>
      <div>
         <table class="table table-bordered">
            <thead>
               <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Monto Presupuestado</th>
                  <th scope="col">Monto Actual Real</th>
                  <th scope="col">Resto</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="item in counterStore.totalBudgetList">
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td style="color: orange">{{ formatter.format(item.budgetAmount) }}</td>
                  <td :style="[item.exceeded ? { color: 'red' } : { color: 'green' }]">{{ formatter.format(item.amount)
                  }}</td>
                  <td
                     :style="[item.budgetAmount < item.amount ? { color: 'red' , textDecoration: 'line-through'} : item.budgetAmount == item.amount ? { color: 'darkblue', textDecoration: 'line-through' } : { color: 'orange' }]">
                     {{ formatter.format(item.budgetAmount - item.amount) }}</td>
               </tr>
               <tr>
                  <th scope="row">Total</th>
                  <td colspan="1" class="table-active"></td>
                  <td colspan="1" class="table-active" style="color: orange">
                     <h5 :style="[counterStore.totalBudgetExpense < counterStore.totalEntry ? { color: 'red' } : { color: 'green' }]">{{ formatter.format(counterStore.totalBudgetExpense) }}</h5>
                  </td>
                  <td :style="[counterStore.restAmount < 0 ? { color: 'red' } : { color: 'green' }]">
                     <h5>{{ formatter.format(counterStore.totalExpense) }}</h5>
                  </td>
                  <td :style="[counterStore.restAmount < 0 ? { color: 'red' } : { color: 'blue' }]">
                     <h5>{{ formatter.format(counterStore.restAmount) }}</h5>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { watch, watchEffect } from 'vue';
import { Formater, host } from '../js/helpers';
import router from '../routes';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();


var formatter = Formater()
watchEffect(()=>{
   let cont = 0;
counterStore.totalBudgetList.map(x => {
   cont += x.budgetAmount
});
counterStore.totalBudgetExpense=cont;


})

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    let url = host + "/api/expense/byIdOperation/" + counterStore.operationid

    const headers = {
        //"Content-Type": "application/json",
        Authorization: counterStore.tokenAuth,
        //"Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Credentials": true,
        //"Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    };

    axios.get(url, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.expenseList = response.data
    }).catch(error => {

        console.error("OperationView.vue :url ----> " + error)
    });


    let urlEntry = host + "/api/entry/byIdOperation/" + counterStore.operationid
    axios.get(urlEntry, {
        headers
    }).then((response,) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.entryList = response.data
    }).catch(error => {

        console.error("OperationView.vue :urlEntry ----> " + error)
    });


    let urlOperation = host + "/api/operationByUser/" + counterStore.userId

    axios.get(urlOperation, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.operationList = response.data
    }).catch(error => {

        console.error("OperationView.vue :urlOperation ----> " + error)
    });



    let urlBudget = host + "/api/budget/byIdOperation/" + counterStore.operationid;

    axios.get(urlBudget, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.budgetList = response.data
    }).catch(error => {

        console.error("OperationView.vue :urlBudget ----> " + error)
    });



    let urlTotalBudget = host + "/api/budgetByExpense/"+counterStore.operationid;

    axios.get(urlTotalBudget, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.totalBudgetList = response.data
    }).catch(error => {

        console.error("OperationView.vue :urlTotalBudget ----> " + error)
    });


});
</script>