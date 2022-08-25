<script lang="ts" setup>import { watch } from 'fs';
import { AxiosWatch, host } from '../js/helpers';
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();
if(counterStore.tokenAuth===''){
    console.log('esta vacio el token')
    AxiosWatch( counterStore.budgetList,host+"/api/entry", false)
}
 
console.log("paso por auth")
</script>

<template></template>