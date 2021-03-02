/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-02-04 13:55:27
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
        console.log("请求过来的参数为",params)
        return await Ajax.get('/api/services/app/LssueCategoryService/GetDG?categoryId='+params);
    },
    //查询所有机构无分页
    async GetPmedicinesPages (params:any) {
        return await Ajax.post('/api/services/app/LssuePmedicinesService/GetPagesPmedicines',params);
    },
    //新增产品
    async Create (params:any) {
        return await Ajax.post('/api/services/app/LssuePmedicinesService/LssueAdd',params);
    },
        //新增产品
    async Update (params:any) {
            return await Ajax.post('/api/services/app/LssuePmedicinesService/LssueUpdate',params);
        },
    /**
     * 获取投药单位
     * @param params 
     */
    async GetDosingWay(params:any) {
        return await Ajax.post('/api/services/app/LssueCategoryService/GetPsyslistDowingByParentId',params);
    },
    /**
     * 下发产品
     * @param params 
     */
    async LessuePmedicines(params:any) {
        return await Ajax.post('/api/services/app/LssuePmedicinesService/LessuePmedicines',params);
    }

}

export default DrugsApi;