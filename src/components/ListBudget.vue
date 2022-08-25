<template>
    <h4>Items Presupuestos</h4>
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
                        <table class="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Monto presupuestado</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in counterStore.budgetList">
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.idCategory.split("|")[0] }}</td>
                                    <td>{{ formatter.format(item.amount) }}</td>
                                    <td><img v-bind:src="item.idCategory.split('|')[1]" class="img-fluid mx-auto"
                                            alt="..." style=" width:30px ; height: 30px;"></td>
                                    <td>
                                    <td><img src="https://img.icons8.com/carbon-copy/344/filled-trash.png"
                                            @click="deleted(item._id)" class="img-fluid mx-auto" alt="..."
                                            style=" width:30px ; height: 30px; cursor:pointer;">
                                    </td>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { watch } from 'vue';
import { AxiosWatch, Deleted, Formater, host } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
var formatter = Formater()

async function deleted(valor: any) {
    await Deleted(counterStore.budgetList, valor, host + "/api/budget/");
}

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    AxiosWatch(counterStore.budgetList, host + "/api/budget", false)
});

</script>