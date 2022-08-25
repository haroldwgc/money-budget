export default class BudgetRequest {
    public idOperation: string = '';
    public idCategory: string = '';
    public type: string = '';
    public amount: number = 0;
}



export type BudgetRequests=Array<BudgetRequest>;