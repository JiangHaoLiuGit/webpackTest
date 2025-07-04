<template>
    <h1 class="title">Hello Vue</h1>
    <el-button type="primary">按钮</el-button>
    <ul>
        <li>
            <router-link to="/home">Home</router-link>
        </li>
        <li>
            <router-link to="/user">User</router-link>
        </li>
    </ul>
    <router-view />
</template>

<script>
export default{
    name:"App",
}
</script>

<style>
    .title{
        color: red;
    }
</style>