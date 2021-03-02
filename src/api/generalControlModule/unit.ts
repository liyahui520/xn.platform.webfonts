/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-01-29 10:01:40
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const UnitApi = {
    //获取目录
    async GetAllByOrgId (params: any) {
        return await Ajax.post('/api/services/app/LssueCategoryService/GetPagePSysList',params.data);
    },
    //新增目录信息
   async AddCategoryInfo(params:any){
    return await Ajax.post('/api/services/app/LssueCategoryService/AddCategoryInfo',params.data);
   },
    //获取目录详情
    async GetPSysInfoById(params:any){
        return await Ajax.post('/api/services/app/LssueCategoryService/GetPSysInfoById',params.data);
    },
    //修改目录详情
    async UpdateCategoryInfo(params:any){
        return await Ajax.post('/api/services/app/LssueCategoryService/UpdateCategoryInfo',params.data);
    },
    //删除目录对应信息
    async DeleteCategoryInfo(params:any){
        return await Ajax.post('/api/services/app/LssueCategoryService/DeleteCategoryInfo',params.data);
    },
    //下发单位
    async LessueUnit(params:any){
        return await Ajax.post('/api/services/app/LssueCategoryService/LessueUnit',params.data);
    }
}

export default UnitApi;