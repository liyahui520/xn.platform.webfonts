import Entity from './entity'

export default class FuYouPay extends Entity<number>{
    trace_no: string='';//唯一流水号，机构自己定义，此字段可辅助拉取报文
    ins_cd: string='';//机构号,接入机构在富友的唯一代码
    mchnt_name: string='';//商户全称，不能有特殊字符，仅可包含汉字、数字、字母
    mchnt_shortname: string='';//商户简称，不能有特殊字符，仅可包含汉字、数字、字母
    real_name: string='';//商户真实名称(与营业执照上相同)
    license_type: string='A';//证件类型
    license_no: string='';//证件号码
    license_expire_dt: string='';//证件到期日  长期请填20991231，无有效期请填19000101  （格式yyyyMMdd）
    certif_id: string='';//法人身份证号
    certif_id_expire_dt: string='';//法人身份证到期日
    contact_person: string='';//联系人姓名
    contact_phone: string='';//客服电话，必须纯数字。推荐 400开头电话或11位有效手机号
    contact_addr: string='';//商户经营地联系地址
    contact_mobile: string='';//联系电话
    contact_email: string='';//联系邮箱
    business: string="570";//经营范围代码   个体工商户	居民生活/商业服务	宠物医院/宠物店	宠物医院	570
    city_cd: string='';//商户经营地市代码
    county_cd: string='';//商户经营地区县代码
    acnt_type: string='';//入账卡类型
    inter_bank_no: string='';//入账卡开户行联行号
    iss_bank_nm: string='';//入账卡开户行名称
    acnt_nm: string='';//入账卡户名
    acnt_no: string='';//入账卡号
    settle_tp: string='';//清算类型
    artif_nm: string='';//法人姓名
    acnt_artif_flag: string='';//法人入账标识 
    acnt_certif_tp: string='';//入账证件类型
    acnt_certif_id: string='';//入账证件号
    acnt_certif_expire_dt: string='';//入账证件到期日（格式 yyyyMMdd）
    sign: string='';//签名，详见签名算法
}