import { User } from "./user.model";

export class Data {
    constructor(
        public data: User,
        public errore: string
    ) {}
}