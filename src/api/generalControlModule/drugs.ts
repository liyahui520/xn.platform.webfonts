/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-01-29 10:01:40
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const DrugsApi = {
    //获取目录
    async GetPsysListById (params: any) {
        return await Ajax.get('/api/services/app/LssueCategoryService/GetPsysListById?orgId='+params.orgId+'&categoryId='+params.categoryId);
    },
    //根据parentId获取目录信息
    async GetOrgInfoById (params: any) {
        return await Ajax.get('/api/services/app/LssueCategoryService/GetPsysListByParentId?orgId='+params.orgId+'&parentId='+params.parentId);
    },
    //修改机构对应富有的支付码
    async GetDG (params: any) {
        return await Ajax.get('/api/services/app/LssueCategoryService/GetDG',params);
    },
    //查询所有机构无分页
    async GetPmedicinesPages (params:any) {
        return await Ajax.post('/api/services/app/LssuePmedicinesService/GetPagesPmedicines',params);
    },
    //新增产品
    async Create (params:any) {
      return await Ajax.post('/api/services/app/LssuePmedicinesService/LssueAdd',params);
    },
    /**
     * 获取投药单位
     * @param params 
     */
    async GetDosingWay(params:any) {
      return await Ajax.post('/api/services/app/LssueCategoryService/GetPsyslistDowingByParentId',params);
    }
   
}

export default DrugsApi;