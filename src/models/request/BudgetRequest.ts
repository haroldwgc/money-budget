export default class BudgetRequest {
    public idOperation: string = '';
    public idCategory: string = '';
    public type: string = '';
    public amount: number = 0;
}
export default interface BudgetRequest {
     idOperation: string ;
     idCategory: string ;
     type: string ;
     amount: number ;
}




export type BudgetRequests=Array<BudgetRequest>;