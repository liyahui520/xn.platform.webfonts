/*
 * @Author: yhli
 * @Email: liyahui360@163.com
 * @Date: 2019-11-24 21:26:27
 * @Last Modified by: yhli
 * @Last Modified time: 2019-11-25 14:01:38
 * @Description: 基础接口提供
 */

import Ajax from '@/lib/ajax'

const RoleApi = {
    //获取权限
   async GetAll (params: any) {
        return await Ajax.get('/api/services/app/Role/GetAll',{params:params});
    },
    //创建
    async Create(params: any){
        return await Ajax.post('/api/services/app/Role/Create',params);
    },
    //更新
    async Update(params: any){
        return await Ajax.put("/api/services/app/Role/Update",params);
    },
    //根据id删除
    async Delete(params: any){
        return await Ajax.delete("/api/services/app/Role/Delete?Id="+params)
    },
    //
    async Get(params: any){
        return await Ajax.get("/api/services/app/Role/Get?Id="+params)
    },
    //
    async GetAllPermissions(){
        return await Ajax.get("/api/services/app/Role/getAllPermissions")
    }
}

export default RoleApi;