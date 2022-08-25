<template>

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
import { host } from '../js/helpers';
import router from '../routes';
import Auth from '../components/Auth.vue';

const counterStore = useCounterStore();

watch(() => [counterStore.operationid, counterStore.componentKey], (first, second) => {
    let url = host + "/api/expense/byIdOperation/" + counterStore.operationid
    console.log("nuevo token " + counterStore.tokenAuth)
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
onMounted(()=>{
    let url = host + "/api/expense/byIdOperation/" + counterStore.operationid
    console.log("nuevo token " + counterStore.tokenAuth)
    const headers = { Authorization: counterStore.tokenAuth };
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

    let urlCategory = host + "/api/category";
    // console.log("paso por home")
    axios.get(urlCategory, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        counterStore.categoryList = response.data
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