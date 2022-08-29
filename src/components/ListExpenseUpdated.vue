<template>
    <h4>Gastos</h4>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingExpense">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseExpense" aria-expanded="false" aria-controls="collapseExpense">
                    Gastos
                </button>
            </h2>
            <div id="collapseExpense" class="accordion-collapse collapse" aria-labelledby="headingExpense"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="list-group">
                        <table class="table table-danger">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in counterStore.expenseList">
                                    <td><img v-bind:src="item.iconCategory" class="img-fluid mx-auto" alt="..."
                                            style=" width:30px ; height: 30px;">
                                    </td>
                                    <td style="line-height: 30px">{{ item.name }}</td>
                                    <td style="line-height: 30px">{{ item.nameCategory }}</td>
                                    <td style="line-height: 30px">{{ formatter.format(item.amount) }}</td>
                                    <td style="line-height: 30px">{{ new Date(item.dateAmount).toLocaleDateString() }}
                                    </td>
                                    <td><img src="https://img.icons8.com/color/344/edit--v1.png"
                                            @click="loadDataModalExpense(item)" class="img-fluid mx-auto " alt="..."
                                            style=" width:30px ; height: 30px; cursor:pointer;" data-bs-toggle="modal"
                                            data-bs-target="#expenseUpdate">
                                    </td>
                                    <td><img src="https://img.icons8.com/carbon-copy/344/filled-trash.png"
                                            @click="deleted(item._id)" class="img-fluid mx-auto" alt="..."
                                            style=" width:30px ; height: 30px; cursor:pointer;">
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Total</th>
                                    <td class="table-active"></td>
                                    <td class="table-active"></td>
                                    <td class="table-active" style="color: green">
                                        <h6>{{ formatter.format(counterStore.totalExpense) }}</h6>
                                    </td>
                                    <td class="table-active"></td>
                                    <td class="table-active"></td>
                                    <td class="table-active"></td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="expenseUpdate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating">
                        <input type="text" v-model="counterStore.expense.name" class="form-control"
                            placeholder="Leave a comment here" id="name">
                        <label for="name">Nombre gasto</label>
                    </div>
                    <p></p>
                    <div class="form-floating">
                        <input type="text" v-model="counterStore.expense.amount" class="form-control"
                            placeholder="Leave a comment here" id="amount">
                        <label for="amount">Valor</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="updated(counterStore.expense)" data-bs-dismiss="modal"
                        class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { watch } from 'vue';
import { Deleted, Formater, AxiosWatch, host, Alerta, Updated } from '../js/helpers';
import ExpenseRequest from '../models/request/ExpenseRequest';

import { useCounterStore } from '../stores/counter';

let cont = 0;

const counterStore = useCounterStore();

counterStore.expenseList.map(x => {
    cont += x.amount
})
counterStore.totalExpense = cont;
var formatter = Formater()


async function deleted(valor: any) {
    await Deleted(counterStore.expenseList, valor, host + "/api/expense/");
    Alerta('gasto eliminado satisfactoriamente', 'danger')
}

function loadDataModalExpense(valor: any) {

    counterStore.expense = valor

}

async function updated(valor: any) {

    let urlExpense = host + "/api/expense/" + valor._id;


    let expenseRequest = new ExpenseRequest()
    expenseRequest.amount = valor.amount
    expenseRequest.dateAmount = valor.dateAmount
    expenseRequest.iconCategory = valor.iconCategory
    expenseRequest.nameCategory = valor.idCategory
    expenseRequest.idOperation = valor.idOperation
    expenseRequest.name = valor.name
    expenseRequest.type = valor.type


    await Updated(counterStore.expenseList, expenseRequest, valor, urlExpense);

}


watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.expenseList, host + "/api/expense/byIdOperation/", true)
});
</script>