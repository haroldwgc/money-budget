<script setup lang="ts">

import { onMounted } from 'vue';
import { useCounterStore } from './stores/counter'
import axios from 'axios'
import { host } from './js/helpers';
import router from './routes';

const counterStore = useCounterStore();
onMounted(() => {
  
  const headers = {
           //"Content-Type": "application/json",
        Authorization: counterStore.tokenAuth,
        //"Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Credentials": true,
        //"Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  };
  let urlCategory = host + "/api/category"
  axios.get(urlCategory, { headers }).then((response) => {
    if (response.data.code == 400) {
      router.push('/')
    }
    (counterStore.categoryList = response.data)
  }).catch(error => {

    console.error("APP.vue :urlCategory ----> " + error)
  });


  let urlEntry = host + "/api/entry/byIdOperation/" + counterStore.operationid
  axios.get(urlEntry, { headers }).then((response) => {

    if (response.data.code == 400) {
      router.push('/')
    }
    counterStore.entryList = response.data
  }).catch(error => {

    console.error("APP.vue :urlEntry ----> " + error)
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
