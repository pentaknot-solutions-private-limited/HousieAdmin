export class Player {
    // // tslint:disable-next-line:no-inferrable-types
    // public EmailId: string = '';
    // // tslint:disable-next-line:no-inferrable-types
    // public Password: string = '';
    id: number;
    playerId: string;
    name: string;
    email: string;
    mobileNumber: string;
    address: string;
    passwordHash: string;
    hostIp: string;
    createdBy: string;
    creationDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class PlayerPageList {
    PlayerPageList: Array<any>;
    totalRecords: number;
}



