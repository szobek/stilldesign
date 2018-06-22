export class Usermodel {

    lastName: string;
    firstName: string;
    introduction: string;
    position: string;
    email: string;
    phone: string;
    id: number;


    constructor(param) {
        Object.assign(this, param);
    }
}
