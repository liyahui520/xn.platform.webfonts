import Entity from '../entity'

export default class AiBoKe extends Entity<number>{
    orgId:number=0;//机构id
    orgName: String;//机构名称
    score: number;//积分
    emsType: String;//快递类型
    emsCode: String;//快递单号
    jp: String;//奖品
    createDate: Date;//创建时间
    week: number;//周数
}