export class Usermodel {

    lastName: string;
    firstName: string;
    introduction: Array<any>;
    position: Array<any>;
    email: string;
    phone: string;
    id: number;


    constructor(param) {
        Object.assign(this, param);
    }
}
