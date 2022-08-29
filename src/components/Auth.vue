<script lang="ts" setup>import { watch } from 'fs';
import { AxiosWatch, host } from '../js/helpers';
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();
if(counterStore.tokenAuth===''){
    AxiosWatch( counterStore.budgetList,host+"/api/entry", false)
}
 
</script>

<template></template>