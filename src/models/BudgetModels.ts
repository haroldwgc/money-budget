export default abstract class BudgetModel {

    public static _id: string = '';
    public static idOperation: string = '';
    public static type: string = '';
    public static idCategory: string = '';
    public static amount: number = 0;
}
export default interface  InterfaceBudgetModel {
      _id: string ;
      idOperation: string ;
      type: string ;
      idCategory: string ;
      amount: number ;
}
