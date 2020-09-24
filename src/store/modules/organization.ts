import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Organization from '../entities/organization'
// import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import api from '@/lib/api'
interface OrganizationState extends ListState<Organization>{
    Detailloading: boolean;
    detailConsumption:Organization;
    detailList:Array<string>;
    sellerList: Array<string>;
    pcliments: Array<string>;
}
class OrganizationModule extends ListModule<OrganizationState,any,Organization>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Organization>(),
        loading:false,
        Detailloading:false
    }
    actions={
        async GetOrgList(context:ActionContext<OrganizationState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.OrgList.GetOrgList(payload.data);
            context.state.loading=false;
            if(reponse.data.result.data.length==0){
                context.state.totalCount=0;
                context.state.list=[];
                return
            }
            let page=reponse.data.result as PageResult<Organization>;
            
            context.state.totalCount=(page as any).data[0].pageCount;
            context.state.list=(page as any).data;
        }
    }
}
const organizationModule=new OrganizationModule();
export default organizationModule;