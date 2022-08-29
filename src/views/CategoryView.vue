<template>
    <Alert />
    <Auth />
    <NavBar />
    <p></p>

    <FormCategory :key="counterStore.componentKey" />
    <ListCategory v-if="counterStore.categoryList.length > 0" :key="counterStore.componentKey" />

</template>

<script lang="ts" setup>
import { useCounterStore } from '../stores/counter'
import NavBar from '../components/NavBar.vue'
import { watch } from 'vue';
import axios from 'axios';
import ListCategory from '../components/ListCategory.vue';
import FormCategory from '../components/FormCategory.vue';
import { host } from '../js/helpers';
import router  from '../routes';
import Alert from '../components/Alert.vue';
import Auth from '../components/Auth.vue';
const counterStore = useCounterStore();


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