import {RouteRecordRaw,createRouter,createWebHistory} from 'vue-router'
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
        path:'/money-budget/operation',
        name:'operation',
        component:OperationView
    },
    {
        path:'/money-budget/home',
        name:'Home',
        component:HomeView
    },
    {
        path:'/money-budget/expense',
        name:'expense',
        component:ExpenseView
    },
    {
        path:'/money-budget/entry',
        name:'entry',
        component:EntryView
    }
    ,
    {
        path:'/money-budget/category',
        name:'category',
        component:CategoryViewVue
    } ,
    {
        path:'/money-budget/budget',
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
        path:'/money-budget/register',
        name:'register',
        component: RegisterView
    }
];
const router=createRouter({
    
    history:createWebHistory(),
    routes
});
export default router;