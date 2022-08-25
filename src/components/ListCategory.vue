<template>
    <h4>Categoria</h4>
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
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Icon</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in counterStore.categoryList">
                                    <td>{{ item.name }}</td>
                                    <td><img v-bind:src="item.icon" class="img-fluid mx-auto" alt="..."
                                            style=" width:30px ; height: 30px;"></td>
                                    <td><td><img src="https://img.icons8.com/carbon-copy/344/filled-trash.png"
                                            @click="deleted(item._id)" class="img-fluid mx-auto" alt="..."
                                            style=" width:30px ; height: 30px; cursor:pointer;">
                                    </td></td>

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
import { AxiosWatch, Deleted, host } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();

async function deleted(valor: any) {
    await Deleted(counterStore.categoryList,valor,host+"/api/category/");  
}
watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    let url = host+"/api/category";
    // console.log("paso por home")
    axios.get(url).then((response) => (counterStore.categoryList = response.data));

AxiosWatch(counterStore.categoryList, host+"/category", false)
});

</script>