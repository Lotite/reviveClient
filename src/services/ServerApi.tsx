import { TAccountError, TdevicesList, TerrorFromUser, TinputsValue, TrecomendationMedia, Trequest, TmediaItem, TserieInfo } from "../utils/types";



export default class ServerApi{
    static readonly dominionServer = "https://api.revivestreem.site/api/";
    static readonly localHost = "http://localhost:81/api/";
    static readonly api: string = this.localHost;

  

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
            const data:Trequest<T> = await response.json();

           
           
            if (data.session) {
                Object.entries(data.session).forEach(([key, value]) => {
                    sessionStorage.setItem(key, value);
                });
            }
            
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

static async recoverRequest(email: string): Promise<Trequest<{ token?: string, email?: string }>> {
    return await this.sendRequest("recoverRequest", { email });
}

static async recoverVerify(email: string, code: string): Promise<Trequest<{ token?: string }>> {
    return await this.sendRequest("recoverVerify", { email, code });
}

static async recoverReset(email: string, code: string, token: string, newPassword: string, confirmPassword: string): Promise<Trequest<null>> {
    return await this.sendRequest("recoverReset", { email, code, token, newPassword, confirmPassword });
}

static async validateSession(){
    const response = await this.sendRequest<any>("validateSession");
    if (!response.success) {
        sessionStorage.clear();
    }
    return response;
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

static async updateUser(data: {name?: string; email?: string}): Promise<Trequest<TerrorFromUser>> {
    return await this.sendRequest("updateUser", data);
}

static async changePassword(data: { currentPassword: string; newPassword: string; confirmPassword: string; keepSessions?: boolean }): Promise<Trequest<TAccountError>> {
    return await this.sendRequest("changePassword", data);
  }

static async getUserDevices(): Promise<Trequest<TdevicesList>> {
    return await this.sendRequest("getUserDevices", undefined);
}

static async deleteDevice(deviceId: string): Promise<Trequest<null>> {
    return await this.sendRequest("deleteDevice", { id: deviceId });
}

static async deleteOtherDevices(): Promise<Trequest<null>> {
    return await this.sendRequest("deleteOtherDevices", undefined);
}

static async deleteUser(): Promise<Trequest<null>> {
    return await this.sendRequest("deleteUser", undefined);
}

static async logout(): Promise<Trequest<null>> {
    return await this.sendRequest("logout", undefined);
}

static async getRecommendedMedia(media_id: string, quantity: string): Promise<Trequest<Array<TmediaItem>>> {
    return await this.sendRequest("recommendateSimilar", { media_id, quantity });
}

static async searchMedia(name: string): Promise<Trequest<Array<TmediaItem>>> {
    return await this.sendRequest("search", { name });
}

static async getSeasonsAndEpisodes(media_id: number): Promise<Trequest<TserieInfo>> {
    return await this.sendRequest<TserieInfo>("seasonsAndEpisodes", { media_id });
}

static async getCarouselMedia(type:string = ""){
    return await this.sendRequest<Array<TmediaItem>>("carousel", { type });
}
static async getNextEpisodie(media_id:number){
    return await this.sendRequest< TmediaItem>("hasContinuation", { media_id });
}

static async saveMediaToList(media_id: number): Promise<Trequest<[]>> {
    return await this.sendRequest("saveMediaToList", { media_id});
}

static async deleteMediaFromList(media_id: number): Promise<Trequest<[]>> {
    return await this.sendRequest("deleteMediaFromList", { media_id });
}

static async isMediaInUserList(media_id: number): Promise<Trequest<{ exist: boolean }>> {
    return await this.sendRequest("isMediaInUserList", { media_id });
}

static async getUserList(): Promise<Trequest<Array<TmediaItem>>> {
    return await this.sendRequest<Array<TmediaItem>>("getUserList");
}

}
