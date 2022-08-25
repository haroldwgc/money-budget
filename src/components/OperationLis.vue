<script lang="ts" setup>
import { useCounterStore } from '../stores/counter';
const counterStore = useCounterStore();
</script>
<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Operaciones registradas
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="list-group">
                        <div v-for="item in counterStore.operationList" class="list-group-item list-group-item-action">
                            <div style="cursor:pointer;" data-bs-toggle="collapse"  data-bs-target="#collapseTwo"  aria-controls="collapseTwo"  @click="counterStore.getIdOperation(item._id.toString() +'|'+item.name)">{{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <hr style="height:2px; width:100%; border-width:0; color:red; background-color:gray">
    <div class="row">
    </div>
    <div class="row">

        <div class="col-sm-6">

        </div>
    </div>
</template>