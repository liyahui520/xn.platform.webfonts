/*
 * @Author: yhli
 * @Email: liyahui360@163.com
 * @Date: 2019-11-24 21:26:27
 * @Last Modified by: yhli
 * @Last Modified time: 2019-11-25 14:21:52
 * @Description: 用户基础接口提供
 */

import Ajax from '@/lib/ajax'

const UserApi = {
    //获取
   async GetAll (params: any) {
        return await Ajax.get('/api/services/app/User/GetAll',params);
    },
    //创建
    async Create(params: any){
        return await Ajax.post('/api/services/app/User/Create',params);
    },
    //更新
    async Update(params: any){
        return await Ajax.put("/api/services/app/User/Update",params);
    },
    //根据id删除
    async Delete(params: any){
        return await Ajax.delete("/api/services/app/User/Delete?Id="+params)
    },
    //
    async Get(params: any){
        return await Ajax.get("/api/services/app/User/Get?Id="+params)
    },
    async GetRoles(){
        return await Ajax.get("/api/services/app/User/GetRoles");
    },
    async ChangeLanguage(params: any){
        return await Ajax.post("/api/services/app/User/ChangeLanguage",params);
    }
}

export default UserApi;