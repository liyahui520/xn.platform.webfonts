import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Manufacturer from '../../entities/generalControlModule/manufacturer'
import api from '@/lib/api'
interface ManufacturerState extends ListState<Manufacturer>{ 
    ManufacturerData:any
}
class ManufacturerModule extends ListModule<ManufacturerState,any,Manufacturer>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array(),
        loading:false,
    }
    actions={
       /**
       * 获取生产商
       * @param context 
       * @param payload 
       */
        async GetAllByOrgId(context:ActionContext<ManufacturerState,any>,payload:any) {
            let respose = await api.ManfacturerApi.GetAllByOrgId(payload); 
            console.log("返回的列表数据为",(respose as any).data.result.result)
            context.state.list=(respose as any).data.result.result;
            context.state.totalCount=(respose as any).data.result.totalCount;

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