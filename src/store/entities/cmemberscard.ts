import Entity from './entity'

export default class CMembersCard extends Entity<number>{
    orgId:number;
    cardType:number;
    cardNo: number;
    cardLastTime:Date;
    cardCount:number;
    cardBalance:number;
    cardUseType:number;
    cardUserTypeText:string;
    cardStatus:number;
    cardStatusText:string;
    cardPassword:string;
    customId:number;
    cardCreateTime:Date;
    cardSellerId:number;
    cardUpdater:number;
    cardUpdateTime:Date;
    presentAmount:number;
    oriAmount:number;
    presentCount:number;
    oriCount:number;
    bTotalAmount:number;
    bOriAmount:number;
    bPresentAmount:number;
    bOriCount:number;
    bPresentCount:number;
    bTotalCount:number;
    isEx:boolean;
    sellerName:string;
    orgName:string;
    pCustomerName:string;
    cellPhone:string;
}