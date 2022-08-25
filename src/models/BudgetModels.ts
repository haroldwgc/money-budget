export default class BudgetModel {

    public _id: string = '';
    public idOperation: string = '';
    public type: string = '';
    public idCategory: string = '';
    public amount: number = 0;
}



export type BudgetModels=Array<BudgetModel>;