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
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Tipo Gasto</th>
                                    <th scope="col">Monto</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr v-for="item in counterStore.expenseList"  >
                                    <td style="line-height: 30px" >{{ item.name }}</td>
                                    <td style="line-height: 30px" >{{ item.nameCategory }}</td>
                                    <td style="line-height: 30px" >{{ item.type }}</td>
                                    <td style="line-height: 30px" >{{formatter.format(item.amount)}}</td>
                                    <td style="line-height: 30px" >{{ new Date(item.dateAmount).toLocaleDateString() }}</td>
                                    <td style="line-height: 30px" ><img v-bind:src="item.iconCategory" class="img-fluid mx-auto" alt="..."
                                            style=" width:30px ; height: 30px;">
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
import { Formater } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
var formatter = Formater()


</script>