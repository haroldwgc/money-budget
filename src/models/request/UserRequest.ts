export default class UserRequest {
    public user: string = '';
    public name: string = '';
    public mail: string = '';
    public password: string = '';
}


export type UserRequests=Array<UserRequest>;