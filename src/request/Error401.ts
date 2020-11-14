export default class Error401 extends Error {
    constructor(message:string){
        super(message);
        this.name = "Error 401 Unauthorized";
    }
}
