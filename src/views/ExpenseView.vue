<template>
<Auth/>
    <NavBar :key="counterStore.componentKey" />
    <p></p>
    <OperationList v-if="counterStore.operationList.length != 0" />
    <FormExpense v-if="counterStore.operationid != ''" :key="counterStore.componentKey" />
    <ListExpenseUpdated v-if="counterStore.expenseList.length > 0" :key="counterStore.componentKey" />

</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'
import NavBar from '../components/NavBar.vue'
import OperationList from '../components/OperationLis.vue'
import ListExpenseUpdated from '../components/ListExpenseUpdated.vue';
import { watch } from 'vue';
import axios from 'axios';
import FormExpense from '../components/FormExpense.vue';
import { host } from '../js/helpers';
import router from '../routes';
import Auth from '../components/Auth.vue';
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