<script setup lang="ts">

import { onMounted } from 'vue';
import { useCounterStore } from './stores/counter'
import axios from 'axios'
import { host } from './js/helpers';
import router from './routes';

const counterStore = useCounterStore();
onMounted(() => {

  console.log(counterStore.numberOfChanges);
  const headers = {
        Authorization: counterStore.tokenAuth,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    };
  let urlexpense = host +"api/operationByUser/"+counterStore.userId
  axios.get(urlexpense, { headers }).then((response) =>{
     if (response.data.code == 400) {
      router.push('/')
    }
     (counterStore.operationList = response.data)
  });

  let urlCategory = host + "/api/category"
  axios.get(urlCategory, { headers }).then((response) => {
     if (response.data.code == 400) {
      router.push('/')
    }
    (counterStore.categoryList = response.data)
  });

  let urlEntry = host + "/api/entry/byIdOperation/" + counterStore.operationid
  axios.get(urlEntry, { headers }).then((response) => {

    if (response.data.code == 400) {
      router.push('/')
    }
    counterStore.entryList = response.data
  });

})

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
