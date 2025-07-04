<template>
    <h1>Home Component</h1>
    <h3 class="sum">{{ sum }}</h3>
</template>

<script setup>
import {ref} from "vue"
const sum = ref(10)
console.log(sum.value)
</script>

<style scoped>
.sum{
    color:red
}
</style>
