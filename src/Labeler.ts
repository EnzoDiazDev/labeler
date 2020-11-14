import {labeler_options, label} from "./utils/types";
import Request from "./request/Request";

export default class Labeler {
    private request:Request

    constructor(options:labeler_options){
        this.request = new Request(options);
    }

    public async get_label(label_name:string):Promise<label> {
        try {
            const response = await this.request.get_label(label_name);

            return {
                name: response.name,
                color: response.color,
                description: response.description || ""
            };
        } catch (e) {
            throw new Error(e);
        }
    }

    public async get_labels(labels_name:string[]|"*"):Promise<label[]> {
        try {
            if(labels_name === "*") {
                const response = await this.request.get_labels() as Array<any>;

                const labels = response.map(label => {
                    return {
                        name: label.name,
                        color: label.color,
                        description: label.description || ""
                    };
                });

                return labels;
            } else {
                if(labels_name.length === 0) return [];

                const labels:label[] = [];

                for(let i = 0; i < labels_name.length; i++) {
                    const label_name = labels_name[i];
                    const label = await this.get_label(label_name).catch(() => null);

                    if(label === null) continue;
                    labels.push(label);
                }

                return labels;
            };
        } catch (e) {
            throw new Error(e);
        }
    }

    public async add_label(label:label):Promise<void> {
        try {
            await this.request.post_label(label);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async add_labels(labels:label[]):Promise<void> {
        try {
            if(labels.length === 0) return;

            for(let i = 0; i < labels.length; i++){
                const label = labels[i];
                await this.add_label(label).catch(console.error);
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    public async delete_label(label_name:string):Promise<void> {
        try {
            await this.request.delete_label(label_name);
        } catch (e) {
            throw new Error(e);
        }
    }

    public async delete_labels(labels_name:string[]|"*"):Promise<void> {
        try {
            if(labels_name === "*") {
                const current_labels = await this.get_labels("*");
                labels_name = current_labels.map(label => label.name);
            }

            if(labels_name.length === 0) return;

            for(let i = 0; i < labels_name.length; i++){
                const label = labels_name[i];
                await this.delete_label(label).catch(console.error);
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}
