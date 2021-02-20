/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-01-29 10:01:40
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const PProviderApi = {
    //获取供应商
    async GetAllByOrgId (params: any) {
        return await Ajax.post('/api/services/app/LssuePProvider/GetAllPageByOrgId',params.data);

    },
    //新增供应商信息
   async AddPProviderInfo(params:any){
    return await Ajax.post('/api/services/app/LssuePProvider/AddPProviderInfo',params.data);
   },
    //获取供应商详情
    async GetPProviderInfoById(params:any){
        return await Ajax.get('/api/services/app/LssuePProvider/GetPProviderInfoById?pproviderId='+params.data);
    },
    //获取供应商详情
    async UpdatePProviderInfo(params:any){
        return await Ajax.post('/api/services/app/LssuePProvider/UpdatePProviderInfo',params.data);
    },
    //删除供应商对应信息
    async DeletePProviderInfo(params:any){
        return await Ajax.get('/api/services/app/LssuePProvider/DeletePProviderInfo?pproviderId='+params.data);
    }
}

export default PProviderApi;