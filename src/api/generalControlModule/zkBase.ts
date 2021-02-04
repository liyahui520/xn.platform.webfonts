/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-01-29 10:26:13
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const ZKBase = {
    //获取生产商
    async GetManufacturerListById (params: any) {
        return await Ajax.post('/api/services/app/LessueManufacturerService/GetAllByOrgId',params.data);
    }, 
    //获取供应商
    async GetPProviderById (params: any) {
        return await Ajax.post('/api/services/app/LessuePProviderService/GetAllByOrgId',params.data);
    },

    //使用方式
    async GetSysCategoryByParentId (params: any) {
      return await Ajax.post('/api/services/app/LssueCategoryService/GetSysCategoryByParentId?parentId=2287',{parentId:2287});
  }
}

export default ZKBase;