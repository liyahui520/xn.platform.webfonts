import Entity from './entity'

export default class ChargeHistory extends Entity<number>{
    OrgId:string;
    CustomerID:number;
    CardNumber:string;
    CustomerName:string;
    CellPhone:string;
    Caish:string;
    CarkPayed:string;
    WeChat:string;
    AliPay:string;
    WXVice:string;
    ZFBVice:string;
    InAccountAmount:string;
    GiftAmount:string;
    CurrentTotalAmount:string;
    ReceivedAmount:string;
    AccountStatus:boolean;
}