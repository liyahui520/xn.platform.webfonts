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
        loading:false,
    }
    actions={
        async SaveFuYouPayInfo(context:ActionContext<FuYouPayState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.FuYouPay.SaveFuYouPayInfo(payload.data);
            context.state.loading=false;
            return reponse;
        },
        async UploadImage(context:ActionContext<FuYouPayState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.FuYouPay.UploadImage(payload.data);
            context.state.loading=false;
            return;
            console.log(reponse.data.result.result.length)
            
        },
        async LoadHtml(context:ActionContext<FuYouPayState,any>,payload:any){
            let reponse=await api.FuYouPay.LoadHtml(payload.data);
            if(reponse.data.result!=null){
                return reponse.data.result;
            }
            else{
                return {sign_url:""};
            }
        },
        async GetBankDictList(context:ActionContext<FuYouPayState,any>,payload:any){
            let reponse=await api.FuYouPay.GetBankDictList(payload.data);
            if(reponse.data.result!=null){
                return reponse.data.result;
            }
            else{
                return [];
            }
        },
        async ElecContractSign(context:ActionContext<FuYouPayState,any>,payload:any){
            let reponse=await api.FuYouPay.ElecContractSign(payload.data);
            if(reponse.data.result!=null){
                return reponse.data.result;
            }
            else{
                return null;
            }
        }
    };
    mutations={
        setCurrentPage(state:FuYouPayState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:FuYouPayState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const fuyoupayModule=new FuYouPayModule();
export default fuyoupayModule;