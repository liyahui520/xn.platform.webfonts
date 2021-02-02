import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Manufacturer from '../../entities/generalControlModule/manufacturer'
import api from '@/lib/api'
interface ManufacturerState extends ListState<Manufacturer>{ 
    ManufacturerData:any,
    manufacturerInfo:Manufacturer
}
class ManufacturerModule extends ListModule<ManufacturerState,any,Manufacturer>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array(),
        loading:false,
        manufacturerInfo:new Manufacturer()
    }
    actions={
       /**
       * 获取生产商
       * @param context 
       * @param payload 
       */
        async GetAllByOrgId(context:ActionContext<ManufacturerState,any>,payload:any) {
            let respose = await api.ManfacturerApi.GetAllByOrgId(payload); 
            context.state.list=(respose as any).data.result.result;
            context.state.totalCount=(respose as any).data.result.totalCount;
        },
        /**
       * 添加生产商信息
       * @param context 
       * @param payload 
       */
        async AddManufacturerInfo(context:ActionContext<ManufacturerState,any>,payload:any) {
            await api.ManfacturerApi.AddManufacturerInfo(payload); 
        },
        /**
       * 通过生产商id获取生产商信息
       * @param context 
       * @param payload 
       */
      async GetManufacturerInfoById(context:ActionContext<ManufacturerState,any>,payload:any) {
        let respose = await api.ManfacturerApi.GetManufacturerInfoById(payload); 
        var info= (respose as any).data.result;
        return info;
      },
      /**
       * 更新供应商基本信息
       * @param context 
       * @param payload 
       */
      async UpdateManufacturerInfo(context:ActionContext<ManufacturerState,any>,payload:any) {
          await api.ManfacturerApi.UpdateManufacturerInfo(payload); 
      }
    };
    mutations={
        //设置当前页
        setCurrentPage(state:ManufacturerState,page:number){
            state.currentPage=page;
        },
        //设置页容量
        setPageSize(state:ManufacturerState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const manufacturerModule=new ManufacturerModule();
export default manufacturerModule;