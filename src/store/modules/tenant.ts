import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Tenant from '../entities/tenant'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
import api from '@/lib/api'
interface TenantState extends ListState<Tenant>{
    editTenant:Tenant;
}
class TenantModule extends ListModule<TenantState,any,Tenant>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Tenant>(),
        loading:false,
        editTenant:new Tenant()
    }
    actions={
        async getAll(context:ActionContext<TenantState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.TenantApi.GetAll({params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Tenant>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async create(context:ActionContext<TenantState,any>,payload:any){
            await api.TenantApi.Create(payload.data);
        },
        async update(context:ActionContext<TenantState,any>,payload:any){
            await api.TenantApi.Update(payload.data);
        },
        async delete(context:ActionContext<TenantState,any>,payload:any){
            await api.TenantApi.Delete(payload.data.id);
        },
        async get(context:ActionContext<TenantState,any>,payload:any){
            let reponse=await api.TenantApi.Get(payload.id);
            return reponse.data.result as Tenant;
        }
    };
    mutations={
        setCurrentPage(state:TenantState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:TenantState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:TenantState,tenant:Tenant){
            state.editTenant=tenant;
        }
    }
}
const tenantModule=new TenantModule();
export default tenantModule;