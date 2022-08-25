import axios from "axios";
import router from "../routes";
import { useCounterStore } from '../stores/counter';

export async function Login(user: any) {
    const counterStore = useCounterStore();
    await axios.post(host + "/api/auth", user, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        counterStore.tokenAuth = response.data.token;
        counterStore.userId=response.data.user._id;
        console.log(response.data.token);
    }).catch((error) => {
        if (error.response) {
            console.log(error.response.data); // => the response payload 
        }
    });

    router.push("/home")
}

export function AxiosWatch(list: any, uri: string, useOperationId: boolean) {
    const counterStore = useCounterStore();
    let url = "";
    console.log("token "+counterStore.tokenAuth)
    if (useOperationId)
        url = uri + counterStore.operationid;
    else
        url = uri;
        const headers = {
            Authorization: counterStore.tokenAuth,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        };

    axios.get(url, {
        headers
    }).then((response) => {
        if (response.data.code == 400 ||response.data===undefined) {
            console.log(response.data)
            router.push('/')
        }
        list = response.data
    });

}

export function Deleted(list: any, valor: any, uri: string) {
    const counterStore = useCounterStore();
    let urlOperation = uri + valor;
    const headers = {
        Authorization: counterStore.tokenAuth,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    };
    axios.delete(urlOperation, { headers }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        list = response.data
    });
    counterStore.componentKey += 1;
}

async function Send(model: any, uri: string) {

    const counterStore = useCounterStore();
    const headers = {
        Authorization: counterStore.tokenAuth,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
    };
    let url = uri;
    console.log(model)
    await axios.post(url, model, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        console.log(model)
        //console.log(response.data);
    }).catch((error) => {
        if (error.response) {
            console.log(error.response.data); // => the response payload 
        }
    });
    counterStore.componentKey += 1;
}

export function Formater() {

    const result = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });

    return result;
}

export const host="https://shrouded-gorge-06880.herokuapp.com";
//export const host = "http://localhost:9000";
export default Send;