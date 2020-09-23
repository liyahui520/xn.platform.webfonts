/*
 * @Author: yhli
 * @Email: liyahui360@163.com
 * @Date: 2019-11-24 21:26:27
 * @Last Modified by: yhli
 * @Last Modified time: 2020-09-18 17:15:00
 * @Description: 基础接口提供
 */

import Ajax from '@/lib/ajax'

const ConsumptionApi = {
    //获取消费记录列表
    async GetAll (params: any) {
        return await Ajax.post('/api/services/app/CpaymentsService/GetAllCpayments',params);
    },
    //获取宠物列表
   async GetSellersAll (params: any) {
        return await Ajax.post('/api/services/app/CpaymentsService/GetSellers?orgId='+params);
    },
    //创建
    async GetDetail(params: any){
        return await Ajax.post('/api/services/app/CpaymentsService/GetCpaymentDetalis',params)
    },
    
    //
    async Get(params: any){
        return await Ajax.get("/api/services/app/Role/Get?Id="+params)
    },
    //
    async GetAllPermissions(){
        return await Ajax.post("/api/services/app/CpaymentsService/GetAllCpayments")
    }
}

export default ConsumptionApi;