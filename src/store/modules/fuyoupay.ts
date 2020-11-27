import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import FuYouPay from '../entities/fuyoupay'
// import Ajax from '../../lib/ajax'
import MyPageResult from '@/store/entities/mypage-result';
import api from '@/lib/api'
interface FuYouPayState extends ListState<FuYouPay>{
    Detailloading: boolean;
    dataLists:FuYouPay;
    detailList:Array<FuYouPay>;  
}
class FuYouPayModule extends ListModule<FuYouPayState,any,FuYouPay>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<FuYouPay>(), 
        loading:false
    }
    actions={
        async SaveFuYouPayInfo(context:ActionContext<FuYouPayState,any>,payload:any){
            context.state.loading=true;
            console.log("保存富友支付接口");
            let reponse=await api.FuYouPay.SaveFuYouPayInfo(payload.data);
            context.state.loading=false;

            console.log("保存富有支付信息返回的内容为",reponse);
            return;
            console.log(reponse.data.result.result.length)
            if(reponse.data.result.result.length==0){
                context.state.totalCount=0;
                context.state.list=[];
                return
            }
            let page=reponse.data.result as MyPageResult<FuYouPay>; 
            context.state.totalCount = page.totalCount;
            context.state.list=page.result;
        },
        async UploadImage(context:ActionContext<FuYouPayState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.FuYouPay.UploadImage(payload.data);
            context.state.loading=false;
            return;
            console.log(reponse.data.result.result.length)
            
        },
        
    };
    mutations={
        setCurrentPage(state:FuYouPayState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:FuYouPayState,pagesize:number){
            state.pageSize=pagesize;
        },
        detail(state:FuYouPayState,chargeHistory:FuYouPay){
            state.dataLists=chargeHistory;
        }
    }
}
const fuyoupayModule=new FuYouPayModule();
export default fuyoupayModule;