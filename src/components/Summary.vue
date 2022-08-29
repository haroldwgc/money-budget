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
                     <h5>{{ formatter.format(counterStore.totalBudgetExpense) }}</h5>
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
import { Formater } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();

let cont = 0;
counterStore.totalBudgetList.map(x => {
   cont += x.budgetAmount
});
counterStore.totalBudgetExpense=cont;

var formatter = Formater()
</script>