import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PProvider from '../../entities/generalControlModule/pprovider'
import api from '@/lib/api'
interface PProviderState extends ListState<PProvider>{ 
    PProviderData:any,
    pproviderInfo:PProvider
}
class PProviderModule extends ListModule<PProviderState,any,PProvider>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array(),
        loading:false,
        pproviderInfo:new PProvider()
    }
    actions={
       /**
       * 获取供应商
       * @param context 
       * @param payload 
       */
        async GetAllByOrgId(context:ActionContext<PProviderState,any>,payload:any) {
            let respose = await api.PProviderApi.GetAllByOrgId(payload); 
            context.state.loading=true;
            context.state.list=(respose as any).data.result.result;
            context.state.loading=false;
            context.state.totalCount=(respose as any).data.result.totalCount;
        },
        /**
       * 添加供应商信息
       * @param context 
       * @param payload 
       */
        async AddPProviderInfo(context:ActionContext<PProviderState,any>,payload:any) {
            await api.PProviderApi.AddPProviderInfo(payload); 
        },
        /**
       * 通过供应商id获取供应商信息
       * @param context 
       * @param payload 
       */
      async GetPProviderInfoById(context:ActionContext<PProviderState,any>,payload:any) {
        let respose = await api.PProviderApi.GetPProviderInfoById(payload); 
        var info= (respose as any).data.result;
        return info;
      },
      /**
       * 更新供应商基本信息
       * @param context 
       * @param payload 
       */
      async UpdatePProviderInfo(context:ActionContext<PProviderState,any>,payload:any) {
          await api.PProviderApi.UpdatePProviderInfo(payload); 
      },
      /**
       * 删除供应商基本信息
       * @param context 
       * @param payload 
       */
      async DeletePProviderInfo(context:ActionContext<PProviderState,any>,payload:any) {
        await api.PProviderApi.DeletePProviderInfo(payload); 
    }
    };
    mutations={
        //设置当前页
        setCurrentPage(state:PProviderState,page:number){
            state.currentPage=page;
        },
        //设置页容量
        setPageSize(state:PProviderState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const pproviderModule=new PProviderModule();
export default pproviderModule;