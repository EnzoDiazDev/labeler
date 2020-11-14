import axios from "axios";
import { labeler_options, headers, label } from "../utils/types";
import Error401 from "./Error401";
import Error404 from "./Error404";

export default class Request {
    private api_url:string
    private token:string;

    constructor(options:labeler_options){
        this.api_url = `https://api.github.com/repos/${options.repo}/labels`;
        this.token = options.token;
    }

    private error_handler(error:any) {
        if(error.response) {
            if(error.response.status === 404) throw new Error404("This resource does not exist");
            if(error.response.status === 401) throw new Error401("Your token does not have permissions for that");
        }

        throw new Error(error.message || "An unknown error has occurred");
    }

    private basic_headers():headers {
        return {
            "Accept2": "application/vnd.github.v3+json"
        };
    }

    private headers_with_auth():headers {
        return {
            ...this.basic_headers(),
            "Authorization": `token ${this.token}`
        };
    }

    private full_url(endpoint = ""):string {
        return `${this.api_url}${endpoint}`;
    }

    public async get_label(label_name:string):Promise<any> {
        const data = await axios.get(this.full_url(`/${label_name}`), {
            headers: this.basic_headers()
        })  .then(response => response.data)
            .catch(this.error_handler);

        return data;
    }

    public async get_labels():Promise<any> {
        const data = await axios.get(this.full_url(), {
            headers: this.basic_headers()
        })  .then(response => response.data)
            .catch(this.error_handler);

        return data;
    }

    public async post_label(label:label):Promise<void> {
        await axios.post(this.full_url(), label, {
            headers: this.headers_with_auth()
        }).catch(this.error_handler);
    }

    public async delete_label(label_name:string):Promise<void> {
        await axios.delete(this.full_url(`/${label_name}`), {
            headers: this.headers_with_auth()
        }).catch(this.error_handler);
    }
}
