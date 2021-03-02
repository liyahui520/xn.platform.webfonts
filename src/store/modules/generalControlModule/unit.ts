import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Unit from '../../entities/generalControlModule/unit'
import api from '@/lib/api'
interface UnitState extends ListState<Unit>{ 
    UnitData:any,
    unitInfo:Unit
}
class UnitModule extends ListModule<UnitState,any,Unit>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array(),
        loading:false,
        unitInfo:new Unit()
    }
    actions={
       /**
       * 获取生产商
       * @param context 
       * @param payload 
       */
        async GetAllByOrgId(context:ActionContext<UnitState,any>,payload:any) {
            
            let respose = await api.UnitApi.GetAllByOrgId(payload); 
            context.state.loading=true;
            context.state.list=(respose as any).data.result.result;
            context.state.loading=false;
            context.state.totalCount=(respose as any).data.result.totalCount;
        },
        /**
       * 添加生产商信息
       * @param context 
       * @param payload 
       */
        async AddUnitInfo(context:ActionContext<UnitState,any>,payload:any) {
            await api.UnitApi.AddCategoryInfo(payload); 
        },
        /**
       * 通过生产商id获取生产商信息
       * @param context 
       * @param payload 
       */
      async GetUnitInfoById(context:ActionContext<UnitState,any>,payload:any) {
        let respose = await api.UnitApi.GetPSysInfoById(payload); 
        var info= (respose as any).data.result;
        return info;
      },
      /**
       * 更新供应商基本信息
       * @param context 
       * @param payload 
       */
      async UpdateUnitInfo(context:ActionContext<UnitState,any>,payload:any) {
          await api.UnitApi.UpdateCategoryInfo(payload); 
      },
      /**
       * 删除供应商基本信息
       * @param context 
       * @param payload 
       */
      async DeleteUnitInfo(context:ActionContext<UnitState,any>,payload:any) {
        await api.UnitApi.DeleteCategoryInfo(payload); 
    },
          /**
       * 下发单位
       * @param context 
       * @param payload 
       */
      async LessueUnit(context:ActionContext<UnitState,any>,payload:any) {
        return await api.UnitApi.LessueUnit(payload); 
    },
    };
    mutations={
        //设置当前页
        setCurrentPage(state:UnitState,page:number){
            state.currentPage=page;
        },
        //设置页容量
        setPageSize(state:UnitState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const unitModule=new UnitModule();
export default unitModule;