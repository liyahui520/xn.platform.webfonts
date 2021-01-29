import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ZKBase from '../../entities/generalControlModule/pmedicines'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import api from '@/lib/api'
import Pmedicines from '../../entities/generalControlModule/pmedicines'
interface ZKBaseState extends ListState<ZKBase>{ 
    pproviderData:any,
    manufacturerData:any,
    sysCategoryData:any
}
class ZKBaseModule extends ListModule<ZKBaseState,any,ZKBase>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Pmedicines>(),
        loading:false,
        pproviderData:new Array(),
        manufacturerData:new Array(),
        sysCategoryData:new Array()
    }
    actions={
      /**
       * 获取供应商
       * @param context 
       * @param payload 
       */
        async GetPProviderById(context:ActionContext<ZKBaseState,any>,payload:any) {
            let respose = await api.ZKBase.GetPProviderById(payload); 
            context.state.pproviderData = (respose as any).data.result;
        },
          /**
       * 获取生产商
       * @param context 
       * @param payload 
       */
      async GetManufacturerListById(context:ActionContext<ZKBaseState,any>,payload:any) {
        let respose = await api.ZKBase.GetManufacturerListById(payload); 
        context.state.manufacturerData = (respose as any).data.result;
        },
        
        /**
         * 使用方式
         * @param context 
         * @param payload 
         */
        async GetSysCategoryByParentId(context:ActionContext<ZKBaseState,any>,payload:any) {
          let respose = await api.ZKBase.GetSysCategoryByParentId(payload); 
        context.state.sysCategoryData = (respose as any).data.result;
        }
    };
    mutations={
        setCurrentPage(state:ZKBaseState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:ZKBaseState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const zkBaseModule=new ZKBaseModule();
export default zkBaseModule;