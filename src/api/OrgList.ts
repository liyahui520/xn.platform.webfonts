/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2020-09-24 17:20:37
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const OrgListApi = {
    //获取机构列表
    async GetOrgList (params: any) {
        return await Ajax.post('/api/services/app/PClientManagementService/GetAll',params);
    },
    //获取机构信息
    async GetOrgInfoById (params: any) {
        return await Ajax.post('/api/services/app/PClientManagementService/GetTaskPClientManagementById?taskId='+params);
    },
    //修改机构对应富有的支付码
    async UpdateOrgMerchnoById (params: any) {
        return await Ajax.post('/api/services/app/PClientManagementService/UpdatePClientManagement',params);
    },
    //修改机构短信条数
    async UpdateSMSCount (params: any) {
        return await Ajax.post('/api/services/app/PClientManagementService/UpdatePclientSMSCount',params);
    },
    //查询所有机构无分页
    async GetPcliment () {
        return await Ajax.post('/api/services/app/PClientManagementService/GetPcliment');
    },
   
}

export default OrgListApi;