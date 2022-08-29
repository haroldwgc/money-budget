<template>
    <nav id="navbar_main" class="mobile-offcanvas navbar navbar-expand-lg navbar-dark "
        style="background-color: gray;color: black;">
        <div class="container-fluid">

            <ul class="navbar-nav">
                <li v-if="counterStore.operationList.length == 0" class="nav-item">
                    <router-link class="navbar-brand" to="/operation">Operación</router-link>
                </li>
                <li v-if="counterStore.operationList.length != 0 && counterStore.entryList?.length && counterStore.expenseList.length != 0"
                    class="nav-item">
                    <router-link class="navbar-brand" to="/home">Inicio</router-link>
                </li>
                <li v-if="counterStore.operationList.length > 0" class="nav-item">
                    <router-link class="navbar-brand" to="/entry">Ingresos</router-link>
                </li>
                <li v-if="counterStore.operationList.length > 0" class="nav-item">
                    <router-link class="navbar-brand" to="/expense">Gastos</router-link>
                </li>
                <li v-if="counterStore.operationList.length > 0" class="nav-item">
                    <router-link class="navbar-brand" to="/category">Categoria</router-link>
                </li>
                <li v-if="counterStore.operationList.length > 0" class="nav-item">
                    <router-link class="navbar-brand" to="/budget">Presupuesto</router-link>
                </li>
                <li v-if="counterStore.operationList.length != 0" class="nav-item">
                    <router-link class="navbar-brand" to="/operation">Operación</router-link>
                </li>
              
            </ul>


        </div> <!-- container-fluid.// -->
    </nav>


</template>

<script lang="ts" setup>
import axios from 'axios';
import { watch } from 'vue';
import { AxiosWatch, host } from '../js/helpers';
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
 
    AxiosWatch(counterStore.expenseList, host+"/api/expense/byIdOperation/", true)
    AxiosWatch(counterStore.entryList, host+"/api/entry/byIdOperation/", true)
    AxiosWatch(counterStore.operationList, host + "/api/operationByUser/" + counterStore.userId, false)
});

</script>