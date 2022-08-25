<template>
<Auth/>
    <NavBar />
    <p></p>
    <FormOperation />
    <ListOperation v-if="counterStore.operationList.length != 0" />
</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'
import NavBar from '../components/NavBar.vue'
import FormOperation from '../components/FormOperation.vue'
import { watch } from 'vue';
import axios from 'axios';
import ListOperation from '../components/ListOperation.vue';
import { host } from '../js/helpers';
import router from '../routes';

const counterStore = useCounterStore();

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    let url = host + "/api/expense/byIdOperation/" + counterStore.operationid

     const headers = {
        Authorization: counterStore.tokenAuth,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    };
    // console.log("paso por home")
    axios.get(url, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.expenseList = response.data
    });

    let urlEntry = host + "/api/entry/byIdOperation/" + counterStore.operationid
    axios.get(urlEntry, {
        headers
    }).then((response,) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.entryList = response.data
    });

    let urlOperation = host + "/api/operationByUser/"+ counterStore.userId
    // console.log("paso por home")
    axios.get(urlOperation, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.operationList = response.data
    });

    let urlBudget = host + "/api/budget/byIdOperation/" + counterStore.operationid;
    // console.log("paso por home")
    axios.get(urlBudget, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.budgetList = response.data
    });

    let urlTotalBudget = host + "/api/budgetByExpense";
    // console.log("paso por home")
    axios.get(urlTotalBudget, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.totalBudgetList = response.data
    });

});


</script>