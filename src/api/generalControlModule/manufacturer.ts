/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-01-29 10:01:40
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const ManufacturerApi = {
    //获取生产商
    async GetAllByOrgId (params: any) {
        return await Ajax.post('/api/services/app/LessueManufacturerService/GetAllByOrgId',params.data);

    },
    //新增生产商信息
   async AddManufacturerInfo(params:any){
    return await Ajax.post('/api/services/app/LessueManufacturerService/AddManufacturerInfo',params.data);
   },
    //获取生产商详情
    async GetManufacturerInfoById(params:any){
        return await Ajax.get('/api/services/app/LessueManufacturerService/GetManufacturerInfoById?manufacturerId='+params.data);
    },
    //获取生产商详情
    async UpdateManufacturerInfo(params:any){
        return await Ajax.post('/api/services/app/LessueManufacturerService/UpdateManufacturerInfo',params.data);
    },
    //删除生产商对应信息
    async DeleteManufacturerInfo(params:any){
        return await Ajax.post('/api/services/app/LessueManufacturerService/DeleteManufacturerInfo?manufacturerId='+params.data);
    }
}

export default ManufacturerApi;