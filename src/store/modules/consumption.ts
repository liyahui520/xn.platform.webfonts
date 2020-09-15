import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Consumption from '../entities/consumption'
// import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import api from '@/lib/api'
interface ConsumptionState extends ListState<Consumption>{
    editConsumption:Consumption;
    permissions:Array<string>
}
class ConsumptionModule extends ListModule<ConsumptionState,any,Consumption>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Consumption>(),
        loading:false,
        editConsumption:new Consumption(),
        permissions:new Array<string>()
    }
    actions={
        async getAll(context:ActionContext<ConsumptionState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.ConsumptionApi.GetAll(payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Consumption>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<ConsumptionState,any>,payload:any){
            await api.ConsumptionApi.Create(payload.data);
        },
        async update(context:ActionContext<ConsumptionState,any>,payload:any){
            await api.ConsumptionApi.Update(payload.data);
        },
        async delete(context:ActionContext<ConsumptionState,any>,payload:any){
            await api.ConsumptionApi.Delete(payload.data.id);
        },
        async get(context:ActionContext<ConsumptionState,any>,payload:any){
            let reponse=await api.ConsumptionApi.Get(payload.id);
            return reponse.data.result as Consumption;
        },
        async getAllPermissions(context:ActionContext<ConsumptionState,any>){
            let reponse=await api.ConsumptionApi.GetAllPermissions();
            context.state.permissions=reponse.data.result.items;
        }
    };
    mutations={
        setCurrentPage(state:ConsumptionState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:ConsumptionState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:ConsumptionState,consumption:Consumption){
            state.editConsumption=consumption;
        }
    }
}
const consumptionModule=new ConsumptionModule();
export default consumptionModule;