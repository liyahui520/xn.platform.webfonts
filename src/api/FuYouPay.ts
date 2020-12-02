/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-11-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2020-09-28 17:20:37
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const FuYouPayApi = {
  //获取充值消费统计信息
  async UploadImage(params: any) {
    return await Ajax.post('/api/services/app/ChargeHistoryService/GetChargeHistoryAll', params);
  },
  //根据客户id获取客户的充值消费信息
  async SaveFuYouPayInfo(params: any) {

    return await Ajax.post('/api/services/app/FuYouService/AddFuYouTask', params);
  },
  //获取签署协议地址
  async LoadHtml(params: any) {
    return await Ajax.get('/api/services/app/FuYouService/GetEletGenerate?fyNo=' + params);
  },
  //获取对应银行下拉列表
  async GetBankDictList(params: any) {
    return await Ajax.post('/api/services/app/FuYouService/GetBankDictList', params);
  },
  //签署电子协议
  async ElecContractSign(params: any) {
    return await Ajax.post('/api/services/app/FuYouService/ElecContractSign?elecContractGenerateId='+params.elecContractGenerateId+'&verifyNo='+params.verifyNo);
  },
  //提交附件接口
  async AttachConfirm(params: any) {
    return await Ajax.post('/api/services/app/FuYouService/AttachConfirm?fyNo='+params.trace_no);
  }
}

export default FuYouPayApi;