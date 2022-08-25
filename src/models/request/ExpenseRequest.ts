export default class ExpenseRequest {
    public idOperation: string = '';
    public nameCategory: string = '';
    public type: string = '';
    public name: string = '';
    public amount: number = 0;
    public dateAmount: Date = new Date(Date.now());;
    public iconCategory: string = '';
}

export type ExpenseResquests=Array<ExpenseRequest>;