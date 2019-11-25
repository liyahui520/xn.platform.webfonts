/*
 * @Author: yhli
 * @Email: liyahui360@163.com
 * @Date: 2019-11-25 10:29:59
 * @Last Modified by: yhli
 * @Last Modified time: 2019-11-25 11:43:04
 * @Description: Description
 */
// import ajax from '../../lib/ajax';
import api from '@/lib/api'
const account={
    namespaced: true,
    state:{
        
    },
    actions:{
        async isTenantAvailable(state:any,payload:any){
            //let rep=await ajax.post('/api/services/app/Account/IsTenantAvailable',payload.data);
            let rep = await api.BaseApi.IsTenantAvailable(payload.data);
            return rep.data.result;
        }
    }
}
export default account;