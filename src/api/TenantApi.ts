/*
 * @Author: yhli
 * @Email: liyahui360@163.com
 * @Date: 2019-11-24 21:26:27
 * @Last Modified by: yhli
 * @Last Modified time: 2020-09-11 17:31:35
 * @Description: 租户基础接口提供
 */

import Ajax from '@/lib/ajax'

const TenantApi = {
    //获取租户
   async GetAll (params: any) {
        return await Ajax.get('/api/services/app/Tenant/GetAll',params);
    },
    //创建
    async Create(params: any){
        return await Ajax.post('/api/services/app/Tenant/Create',params);
    },
    //更新
    async Update(params: any){
        return await Ajax.put("/api/services/app/Tenant/Update",params);
    },
    //根据id删除
    async Delete(params: any){
        return await Ajax.delete("/api/services/app/Tenant/Delete?Id="+params)
    },
    //
    async Get(params: any){
        return await Ajax.get("/api/services/app/Tenant/Get?Id="+params)
    }
}

export default TenantApi;