import { TerrorFromUser, TinputsValue, TrecomendationMedia, Trequest } from "../utils/types";

export default class ServerApi{
    static readonly api: string = "http://192.168.1.141:81/api/";

static async sendRequest<T>(path: string, body?: any , method:"POST"|"GET" = "POST"): Promise<Trequest<T>> {
    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
         credentials: 'include'
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(ServerApi.api + path, options);
        const data = await response.json();
        return {
            success: data.success,
            message: data.message || '',
            data: data.data as T,
        } as Trequest<T>;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Error en la petición',
            data: null as T,
        } as Trequest<T>;
    }
}


static async register($data:TinputsValue):Promise<Trequest<TerrorFromUser>>{
    return await this.sendRequest("register",$data);
}


static async login($data:TinputsValue):Promise<Trequest<TerrorFromUser>>{
    return await this.sendRequest("login",$data);
    }

static async validateSession(){
    return await this.sendRequest<any>("validateSession");
}

static async getHomeRecomentions(){
    return await ServerApi.sendRequest<Array<TrecomendationMedia>>("home");
}

static async getMoviesRecomentions(){
    return await ServerApi.sendRequest<Array<TrecomendationMedia>>("movies");
}

static async getSeriesRecomentions(){
    return await ServerApi.sendRequest<Array<TrecomendationMedia>>("series");
}



    

}
