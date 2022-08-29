export default abstract class ExpenseModel {
    public static _id: string = '';
    public static idOperation: string = '';
    public static nameCategory: string = '';
    public static type: string = '';
    public name: string = '';
    public static amount: number = 0;
    public static dateAmount: Date = new Date(Date.now());
    public static iconCategory: string = '';
}

export default interface  InterfaceExpenseModel {
    _id: string ;
    idOperation: string ;
    nameCategory: string ;
    type: string;
    name: string ;
    amount: number;
    dateAmount: Date;
    iconCategory: string;
}

export class ExpenseModels {

    public models: ExpenseModel[] = []

}
