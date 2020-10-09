import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state' 
// import Ajax from '../../lib/ajax'
import MyPageResult from '@/store/entities/mypage-result';
import api from '@/lib/api'
import CMembersCard from '../entities/cmemberscard';
interface CMembersCardState extends ListState<CMembersCard>{
    Detailloading: boolean;
    dataLists:CMembersCard;
    detailList:Array<CMembersCard>;  
}
class CMembersCardModule extends ListModule<CMembersCardState,any,CMembersCard>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<CMembersCard>(), 
        loading:false,
        Detailloading:false, 
        detailList:new Array<string>(),
        pcliments: new Array<string>()
    }
    actions={
        async getAll(context:ActionContext<CMembersCardState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.CmembersCard.GetList(payload.data);
            context.state.loading=false;
            console.log(reponse.data.result.result.length)
            if(reponse.data.result.result.length==0){
                context.state.totalCount=0;
                context.state.list=[];
                return
            }
            let page=reponse.data.result as MyPageResult<CMembersCard>; 
            context.state.totalCount = page.totalCount;
            console.log("data",page.result)
            context.state.list=page.result;
            console.log("newdata",context.state.list)
        }
        
    };
    mutations={
        setCurrentPage(state:CMembersCardState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:CMembersCardState,pagesize:number){
            state.pageSize=pagesize;
        },
        detail(state:CMembersCardState,orglist:CMembersCard){
            state.dataLists=orglist;
        }
    }
}
const cMembersCardModule=new CMembersCardModule();
export default cMembersCardModule;