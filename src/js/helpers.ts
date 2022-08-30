import axios from "axios";
import router  from '../routes';
import { useCounterStore } from '../stores/counter';

export async function Login(user: any) {
    const counterStore = useCounterStore();
    await axios.post(host + "/api/auth", user, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        counterStore.tokenAuth = response.data.token;
        counterStore.userId = response.data.user._id;
        if(response.data.code===400){
            Alerta("No existe usuario registrado, por favor registrese","danger");
            router.push("/")
        }
        router.push("/home")
    }).catch((error) => {
        if (error.response) {
           
            Alerta("No existe usuario registrado, por favor registrese","danger");
            console.error(error.response.data); // => the response payload 
            router.push("/")
        }
    });
    
}

export function AxiosWatch(list: any, uri: string, useOperationId: boolean) {
    const counterStore = useCounterStore();
    let url = "";
    if (useOperationId)
        url = uri + counterStore.operationid;
    else
        url = uri;
    const headers = {
              //"Content-Type": "application/json",
              Authorization: counterStore.tokenAuth,
              //"Access-Control-Allow-Origin": "*",
              //"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              // "Access-Control-Allow-Credentials": true,
              //"Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    };

    axios.get(url, {
        headers
    }).then((response) => {
        if (response.data.code == 400 || response.data === undefined) {
            router.push('/')
        }
        list = response.data
    }).catch(error => {

        console.error("Helper.vue :url ----> " + error)
    });

}

export function Deleted(list: any, valor: any, uri: string) {
    const counterStore = useCounterStore();
    let urlOperation = uri + valor;
    const headers = {
               //"Content-Type": "application/json",
               Authorization: counterStore.tokenAuth,
               //"Access-Control-Allow-Origin": "*",
               //"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
               // "Access-Control-Allow-Credentials": true,
               //"Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    };
    axios.delete(urlOperation, { headers }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        list = response.data
    });
    counterStore.componentKey += 1;
}

export async function Updated(list: any,req:any, valor: any, uri: string) {
    const counterStore = useCounterStore();

    const headers = {
        Authorization: counterStore.tokenAuth,
    };
    await axios.put(uri, req, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
        list = response.data
    }).catch(error => {

        console.error("ListExpenseUpdate.vue :urlExpense ----> " + error)
    });
    counterStore.componentKey += 1;
}


async function Send(model: any, uri: string) {

    const counterStore = useCounterStore();
    const headers = {
               //"Content-Type": "application/json",
               Authorization: counterStore.tokenAuth,
               //"Access-Control-Allow-Origin": "*",
               //"Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
               // "Access-Control-Allow-Credentials": true,
               //"Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    };
    let url = uri;
    await axios.post(url, model, {
        headers
    }).then((response) => {
        if (response.data.code == 400) {
            router.push('/')
        }
    }).catch((error) => {
        if (error.response) {
            console.error(error.response.data); // => the response payload 
        }
    });
    counterStore.componentKey += 1;
}

export function Alerta(message: string, type: string) {
    console.log("paso por aqui")
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    document.getElementById('liveAlertPlaceholder')?.append(wrapper);

}


export function Formater() {

    const result = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });

    return result;
}

export const host = "https://shrouded-gorge-06880.herokuapp.com";
//export const host = "http://localhost:9000";
export default Send;