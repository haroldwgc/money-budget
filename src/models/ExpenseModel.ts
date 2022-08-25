export default class ExpenseModel {
    public _id: string = '';
    public idOperation: string = '';
    public nameCategory: string = '';
    public type: string = '';
    public name: string = '';
    public amount: number = 0;
    public dateAmount: Date = new Date(Date.now());
    public iconCategory: string = '';
}

export class ExpenseModels {

    public models: ExpenseModel[] = []

}
