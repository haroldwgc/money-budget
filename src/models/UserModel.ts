export default class UserModel {
    public _id: string = '';
    public user: string = '';
    public name: string = '';
    public mail: string = '';
    public password: string = '';
}


export type UserModels=Array<UserModel>;