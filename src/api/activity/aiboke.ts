/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-01-29 10:01:40
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const AiBoKeApi = {
    //获取爱波克活动内容
    async GetAiBokeAitivity (params: any) {
        return await Ajax.post('/api/services/app/AiBoKeService/GetAiBokeAitivity',params.data);
    },
    //获取爱波克活动列表分页数据
    async GetAiBoKePageList(params:any){
        return await Ajax.post('/api/services/app/AiBoKeService/GetAiBoKePageList',params.data);
    },
    //获取爱波克活动详情
    async GetAiBoKeInfoById(params:any){
        return await Ajax.get('/api/services/app/AiBoKeService/GetAiBoKeInfoById?activityId='+params.data);
    },
    //修改爱波克活动信息
    async UpdateAiBoKeInfo(params:any){
        return await Ajax.post('/api/services/app/AiBoKeService/UpdateAiBoKeInfo',params.data);
    },
    //删除爱波克活动信息
    async DeleteAiBoKeActivity(params:any){
        return await Ajax.get('/api/services/app/AiBoKeService/DeleteAiBoKeActivity?activityId='+params.data);
    }
}

export default AiBoKeApi;