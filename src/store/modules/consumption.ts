import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Consumption from '../entities/consumption'
// import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import api from '@/lib/api'
interface ConsumptionState extends ListState<Consumption>{
    detailConsumption:Consumption;
    detailList:Array<string>;
    sellerList: Array<string>
}
class ConsumptionModule extends ListModule<ConsumptionState,any,Consumption>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Consumption>(),
        sellerList: new Array<Consumption>(),
        loading:false,
        detailConsumption:new Consumption(),
        detailList:new Array<string>()
    }
    actions={
        async getAll(context:ActionContext<ConsumptionState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.ConsumptionApi.GetAll(payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Consumption>;
            context.state.totalCount=page.data[0].pageCount;
            context.state.list=page.data;
        },
        async GetSellersAll(context:ActionContext<ConsumptionState,any>,payload:any){
            let reponse=await api.ConsumptionApi.GetSellersAll();
            let page=reponse.data.result as PageResult<Consumption>;
            console.log(page)
            context.state.sellerList = page.data;
        },
        async GetDetail(context:ActionContext<ConsumptionState,any>){
            let reponse=await api.ConsumptionApi.GetDetail(payload.data);
            context.state.detailList=reponse.data.result.items;
        }
    };
    mutations={
        setCurrentPage(state:ConsumptionState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:ConsumptionState,pagesize:number){
            state.pageSize=pagesize;
        },
        detail(state:ConsumptionState,consumption:Consumption){
            state.detailConsumption=consumption;
        }
    }
}
const consumptionModule=new ConsumptionModule();
export default consumptionModule;