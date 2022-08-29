<template>
    <Alert/>
    <Auth />
    <NavBar />
    <p></p>
    <div>
        <OperationList v-if="counterStore.operationList.length > 1" />
        <p></p>
        <Summary v-if="counterStore.entryList.length > 0 && counterStore.expenseList.length > 0" />
        <ListEntry v-if="counterStore.entryList.length > 0" />
        <p></p>
        <ListExpense v-if="counterStore.expenseList.length > 0" />

    </div>
</template>
<script lang="ts" setup>
import NavBar from '../components/NavBar.vue'
import { onMounted, watch, watchEffect } from 'vue';
import { useCounterStore } from '../stores/counter'
import axios from 'axios'
import OperationList from '../components/OperationLis.vue'
import ListExpense from '../components/ListExpense.vue';
import ListEntry from '../components/ListEntry.vue';
import Summary from '../components/Summary.vue';
import { host,Alerta } from '../js/helpers';
import { router } from '../routes';
import Auth from '../components/Auth.vue';
import Alert from '../components/Alert.vue';


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

        console.error("HelloView.vue :url ----> " + error)
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

        console.error("HelloView.vue :urlEntry ----> " + error)
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

        console.error("HelloView.vue :urlOperation ----> " + error)
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

        console.error("HelloView.vue :urlBudget ----> " + error)
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

        console.error("HelloView.vue :urlTotalBudget ----> " + error)
    });


    let urlCategory = host + "/api/category";

    axios.get(urlCategory, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.categoryList = response.data
    }).catch(error => {

        console.error("HelloView.vue :urlCategory ----> " + error)
    });

});
onMounted(() => {
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

        console.error("HelloView.vue :url ----> " + error)
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

        console.error("HelloView.vue :urlEntry ----> " + error)
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

        console.error("HelloView.vue :urlOperation ----> " + error)
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

        console.error("HelloView.vue :urlBudget ----> " + error)
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

        console.error("HelloView.vue :urlTotalBudget ----> " + error)
    });


    let urlCategory = host + "/api/category";

    axios.get(urlCategory, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.categoryList = response.data
    }).catch(error => {

        console.error("HelloView.vue :urlCategory ----> " + error)
    });



})
watchEffect(() => {

    let totalEntry = 0;
    let totalExpense = 0;
    if (counterStore.entryList.length > 0) {
        counterStore.entryList.forEach(element => {
            totalEntry += element.amount
        });
    }
    if (counterStore.expenseList.length > 0) {
        counterStore.expenseList.forEach(element => {
            totalExpense += element.amount
        });
    }

    if (counterStore.expenseList.length == 0 && counterStore.entryList.length == 0) {

        counterStore.totalEntry = 0
        counterStore.totalExpense = 0
        counterStore.restAmount = totalEntry - 0
    } else {
        counterStore.totalEntry = totalEntry
        counterStore.totalExpense = totalExpense
        counterStore.restAmount = totalEntry - totalExpense
    }

})

</script>