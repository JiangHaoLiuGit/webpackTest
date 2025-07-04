import {createRouter , createWebHistory} from "vue-router"

export default createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            component:()=>import("../views/User")
        },
        {
            path:'/home',
            component:()=>import("../views/Home")
        },
        {
            path:'/user',
            component:()=>import("../views/User")
        }
    ]
})