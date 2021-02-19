import Entity from '../entity'

export default class Unit extends Entity<number>{
    orgId:number=0;//机构id
    unitName: String;//目录名称
    englishName: String;//英文名称
    serialNumber: String;//总部编码
    createDate: String;//创建时间
}