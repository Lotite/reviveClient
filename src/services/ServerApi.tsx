import { TerrorFromUser, TinputsValue, Trequest } from "../utils/types";

export default class ServerApi{
    static readonly api: string = "http://127.0.0.1:8000/api/";

static async sendRequest<T>(path: string, body?: any): Promise<Trequest<T>> {
    const options: RequestInit = {
        method: body ? 'POST' : 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(ServerApi.api + path, options);
        const data = await response.json();
        return {
            succes: response.ok,
            message: data.message || '',
            data: data.data as T,
        } as Trequest<T>;
    } catch (error: any) {
        return {
            succes: false,
            message: error.message || 'Error en la petición',
            data: null as T,
        } as Trequest<T>;
    }
}


static async register($data:TinputsValue):Promise<Trequest<TerrorFromUser>>{
    return await this.sendRequest("register",$data);
}


}
