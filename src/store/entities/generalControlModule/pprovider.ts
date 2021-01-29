import Entity from '../entity'

export default class PProvider extends Entity<number>{
    orgId:number;
    /**
     * 供应商名称
     */
    companyName:String;

    /**
     * 负责人
     */
    leader:String;

    /**
     * 联系方式
     */
    telephone:String;

    /**
     * 邮政编码
     */
    postalCode:String;

    /**
     * 联系地址
     */
    address:String;

    /**
     * 传真号码
     */
    faxNumber:String;

    /**
     * 联系人
     */
    contacter:String;

    /**
     * 企业法人
     */
    enterpriser:String;

    legalerNo:String;

    /**
     * 营业执照
     */
    licenseNo:String;

    /**
     * 业务范围
     */
    scopeBusiness:String;

}
