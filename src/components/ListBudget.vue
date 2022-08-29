<template>
    <h4>Items Presupuestos</h4>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingExpense">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseExpense" aria-expanded="false" aria-controls="collapseExpense">
                    Items
                </button>
            </h2>
            <div id="collapseExpense" class="accordion-collapse collapse" aria-labelledby="headingExpense"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="list-group">
                        <table class="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Monto presupuestado</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in counterStore.budgetList">
                                <td><img v-bind:src="item.idCategory.split('|')[1]" class="img-fluid mx-auto"
                                            alt="..." style=" width:30px ; height: 30px;"></td>
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.idCategory.split("|")[0] }}</td>
                                    <td>{{ formatter.format(item.amount) }}</td>
                                       <td><img src="https://img.icons8.com/color/344/edit--v1.png"
                                            @click="loadDataModalExpense(item)" class="img-fluid mx-auto " alt="..."
                                            style=" width:30px ; height: 30px; cursor:pointer;" data-bs-toggle="modal"
                                            data-bs-target="#budgetUpdate">
                                    </td>
                                    <td><img src="https://img.icons8.com/carbon-copy/344/filled-trash.png"
                                            @click="deleted(item._id)" class="img-fluid mx-auto" alt="..."
                                            style=" width:30px ; height: 30px; cursor:pointer;">
                                    
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="budgetUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating">
                        <input type="text" v-model="counterStore.budget.amount" class="form-control"
                            placeholder="Leave a comment here" id="amount">
                        <label for="amount">Valor</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="updated(counterStore.budget)" data-bs-dismiss="modal"
                        class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang="ts" setup>
import { watch } from 'vue';
import { Alerta, AxiosWatch, Deleted, Formater, host, Updated } from '../js/helpers';
import BudgetRequest from '../models/request/BudgetRequest';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
var formatter = Formater()

async function deleted(valor: any) {
    await Deleted(counterStore.budgetList, valor, host + "/api/budget/");
    Alerta('Item de presupuesto eliminado satisfactoriamente', 'danger')
}

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.budgetList, host + "/api/budget", false)
});


function loadDataModalExpense(valor: any) {

    counterStore.budget = valor

}

async function updated(valor: any) {

    let urlBudget= host + "/api/budget/" + valor._id;

    let budgetRequest = new BudgetRequest()
    budgetRequest.amount = valor.amount
    budgetRequest.idCategory = valor.idCategory
    budgetRequest.idCategory = valor.idCategory
    budgetRequest.idOperation = valor.idOperation
    budgetRequest.type = valor.type

    await Updated(counterStore.expenseList, budgetRequest, valor, urlBudget);

}
</script>