import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import ChargeHistory from '../entities/chargehistory'
// import Ajax from '../../lib/ajax'
import MyPageResult from '@/store/entities/mypage-result';
import api from '@/lib/api'
interface ChargeHistoryState extends ListState<ChargeHistory>{
    Detailloading: boolean;
    dataLists:ChargeHistory;
    detailList:Array<ChargeHistory>;  
}
class ChargeHistoryModule extends ListModule<ChargeHistoryState,any,ChargeHistory>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<ChargeHistory>(), 
        loading:false,
        Detailloading:false, 
        detailList:new Array<string>(),
        pcliments: new Array<string>()
    }
    actions={
        async GetChargeHistoryAll(context:ActionContext<ChargeHistoryState,any>,payload:any){
            console.log("请求数据函数")
            context.state.loading=true;
            let reponse=await api.ChargeHistory.GetChargeHistoryAll(payload.data);
            context.state.loading=false;
            console.log(reponse.data.result.result.length)
            if(reponse.data.result.result.length==0){
                context.state.totalCount=0;
                context.state.list=[];
                return
            }
            let page=reponse.data.result as MyPageResult<ChargeHistory>; 
            context.state.totalCount = page.totalCount;
            context.state.list=page.result;
        }
        
    };
    mutations={
        setCurrentPage(state:ChargeHistoryState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:ChargeHistoryState,pagesize:number){
            state.pageSize=pagesize;
        },
        detail(state:ChargeHistoryState,chargeHistory:ChargeHistory){
            state.dataLists=chargeHistory;
        }
    }
}
const chargeHistoryModule=new ChargeHistoryModule();
export default chargeHistoryModule;