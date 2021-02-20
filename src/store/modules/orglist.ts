import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import OrgList from '../entities/orglist'
// import Ajax from '../../lib/ajax'
import MyPageResult from '@/store/entities/mypage-result';
import api from '@/lib/api'
interface OrgListState extends ListState<OrgList>{
    Detailloading: boolean;
    dataLists:OrgList; 
    detailList:Array<OrgList>;  
}
class OrgListModule extends ListModule<OrgListState,any,OrgList>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<OrgList>(), 
        loading:false,
        Detailloading:false, 
        detailList:new Array<string>(),
        pcliments: new Array<string>()
    }
    actions={
        async getAll(context:ActionContext<OrgListState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.OrgList.GetOrgList(payload.data);
            context.state.loading=false;
            console.log(reponse.data.result.result.length)
            if(reponse.data.result.result.length==0){
                context.state.totalCount=0;
                context.state.list=[];
                return
            }
            let page=reponse.data.result as MyPageResult<OrgList>; 
            context.state.totalCount = page.totalCount;
            console.log("data",page.result)
            context.state.list=page.result;
            console.log("newdata",context.state.list)
        },
        async editSms(context:ActionContext<OrgListState,any>,payload:any) {
            await api.OrgList.UpdateSMSCount(payload.data)
        }
        
    };
    mutations={
        setCurrentPage(state:OrgListState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:OrgListState,pagesize:number){
            state.pageSize=pagesize;
        },
        detail(state:OrgListState,orglist:OrgList){
            state.dataLists=orglist;
        }
    }
}
const orglistModule=new OrgListModule();
export default orglistModule;