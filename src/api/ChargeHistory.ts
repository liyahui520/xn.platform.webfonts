/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-28 
 * @Last Modified by: yhli
 * @Last Modified time: 2020-09-28 17:20:37
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const ChargeHistoryApi = {
    //获取充值消费统计信息
    async GetChargeHistoryAll (params: any) {
        return await Ajax.post('​/api​/services​/app​/ChargeHistoryService​/GetChargeHistoryAll',params);
    },
    //根据客户id获取客户的充值消费信息
    async GetChargeHistoryByCustormeID (params: any) {
        return await Ajax.post('​/api​/services​/app​/ChargeHistoryService​/GetChargeHistoryByCustormeID',params);
    },
   
}

export default ChargeHistoryApi;