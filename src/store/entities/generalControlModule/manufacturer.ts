import Entity from '../entity'

export default class Manufacturer extends Entity<number>{
    orgId:number=0;//机构id
    companyName: String;//生产商名称
    leader: String;//负责人
    telephone: String;//联系电话
    postalCode: String;//邮政编码
    address: String;//联系地址
    faxNumber: String;//传真号码
    contacter: String;//联系人
    enterpriser: String;//企业法人
    legalerNo: String;//法人注册号
    licenseNo: String;//营业执照
    scopeBusiness: String;//经营范围
    recordDate:Date;//登记时间
    operatorId: number=0;//操作人id
    telephone1: String;//联系电话1
    contacter1: String;//联系人1
    serialNumber: String;//生产商编号
    companyType:number=0;//生产商类型
}