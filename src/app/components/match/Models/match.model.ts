export class Match {
    id: number;
    matchId: string;
    title: string;
    description: string;
    matchDateTime: Date;
    matchGeneratedNumber: string;
    hostIp: string;
    createdBy: string;
    creationDate:  Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class MatchPageList {

    MatchPageList: Array<Match>;
    totalRecords: number;
}

export class MatchPrizeRel {
    matchId: string;
    imageDetails: Array<any>;
}

export class MatchPriceRel {
    id: number;
    matchId: string;
    displayPosition: number;
    fileName: string;
    hostIp: string;
    createdBy: string;
    creationDate:  Date;
    updatedBy: string;
    updatedDate: Date;
    isActive: boolean;
    isDeleted: boolean;
}

export class Images {
    displayPosition: number;
    fileName: string;
}
