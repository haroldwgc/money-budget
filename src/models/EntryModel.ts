export default class EntryModel {
    public idOperation: string = '';
    public name: string = '';
    public origin: number = 0;
    public amount: number = 0;
    public created: Date = new Date();
}


export type EntryModelsArray = Array<EntryModel>;
