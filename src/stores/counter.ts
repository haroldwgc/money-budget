import { defineStore } from 'pinia'
import ExpenseModels from '../models/ExpenseModel'
import CategoryModel from '../models/CategoryModel'
import ExpenseModel from '../models/ExpenseModel'
import OperationRequests from '../models/request/OperationRequest'
import EntryRequest from '../models/request/EntryRequest'
import BudgetModel from '../models/BudgetModels'
import TotalBudgetRequest from '../models/request/TotalBudgetReques'
import UserModel from '../models/UserModel'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        counter: 0,
        numberOfChanges: 0,
        operationid: "",
        operationName: "",
        operationList: OperationRequests,
        expenseList: [] as ExpenseModels[],
        categoryList: [] as CategoryModel[],
        entryList: [] as EntryRequest[],
        budgetList: [] as BudgetModel[],
        totalBudgetList: [] as TotalBudgetRequest[],
        totalExpense: 0,
        totalEntry: 0,
        restAmount: 0,
        componentKey: 0,
        tokenAuth:'',
        user: UserModel,
        userId:'',
        expense: ExpenseModel
    }),
    actions: {
        getIdOperation(value: String) {
            this.operationid = value.split('|')[0];
            this.operationName = value.split('|')[1];
        }
    }
})