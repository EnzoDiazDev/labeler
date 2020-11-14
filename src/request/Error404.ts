export default class Error404 extends Error {
    constructor(message:string){
        super(message);
        this.name = "Error 404 Not found";
    }
}
