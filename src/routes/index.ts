import {RouteRecordRaw,createRouter,createWebHistory, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HellowViews.vue';
import ExpenseView from '../views/ExpenseView.vue';
import EntryView from '../views/EntryView.vue';
import OperationView from '../views/OperationView.vue';
import CategoryViewVue from '../views/CategoryView.vue';
import BudgetViewVue from '../views/BudgetView.vue';
import LoginView from '../views/Login.vue';
import RegisterView from '../views/RegisterView.vue';


const routes:RouteRecordRaw[]=[
    {
        path:'/operation',
        name:'operation',
        component:OperationView
    },
    {
        path:'/home',
        name:'Home',
        component:HomeView
    },
    {
        path:'/expense',
        name:'expense',
        component:ExpenseView
    },
    {
        path:'/entry',
        name:'entry',
        component:EntryView
    }
    ,
    {
        path:'/category',
        name:'category',
        component:CategoryViewVue
    } ,
    {
        path:'/budget',
        name:'budget',
        component:BudgetViewVue
    }
    ,
    {
        path:'/',
        name:'login',
        component:LoginView
    }
    ,
    {
        path:'/register',
        name:'register',
        component: RegisterView
    }
];
export const router=createRouter({
    history:createWebHashHistory("#"),
    routes
});