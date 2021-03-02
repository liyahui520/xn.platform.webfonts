// import {Store,Module,ActionContext} from 'vuex'
// import ListModule from '../list-module'
// import ListState from '../list-state'
// import Drugs from '../../entities/generalControlModule/pmedicines'
// import Ajax from '../../../lib/ajax'
// import PageResult from '@/store/entities/page-result';
// import ListMutations from '../list-mutations'
// import api from '@/lib/api'
// interface DrugsState extends ListState<Drugs>{
//     editDrugs:Drugs;
// }
// class DrugsModule extends ListModule<DrugsState,any,Drugs>{
//     state={
//         totalCount:0,
//         currentPage:1,
//         pageSize:10,
//         list: new Array<Drugs>(),
//         loading:false,
//         editDrugs:new Drugs(),
//         categoryData:new Array()
//     }
//     actions={
//         async getCategoryById(context:any,params:any) {
//             let reponse=await api.DrugsApi.GetPsysListById({params:params});
//             context.state.categoryData = reponse;
//         }
//         // async getAll(context:ActionContext<DrugsState,any>,payload:any){
//         //     context.state.loading=true;
//         //     let reponse=await api.DrugsApi.GetAll({params:payload.data});
//         //     context.state.loading=false;
//         //     let page=reponse.data.result as PageResult<Drugs>;
//         //     context.state.totalCount=page.totalCount;
//         //     context.state.list=page.items;
//         // },
//         // async create(context:ActionContext<DrugsState,any>,payload:any){
//         //     await api.DrugsApi.Create(payload.data);
//         // },
//         // async update(context:ActionContext<DrugsState,any>,payload:any){
//         //     await api.DrugsApi.Update(payload.data);
//         // },
//         // async delete(context:ActionContext<DrugsState,any>,payload:any){
//         //     await api.DrugsApi.Delete(payload.data.id);
//         // },
//         // async get(context:ActionContext<DrugsState,any>,payload:any){
//         //     let reponse=await api.DrugsApi.Get(payload.id);
//         //     return reponse.data.result as Drugs;
//         // }
//     };
//     mutations={
//         setCurrentPage(state:DrugsState,page:number){
//             state.currentPage=page;
//         },
//         setPageSize(state:DrugsState,pagesize:number){
//             state.pageSize=pagesize;
//         },
//         edit(state:DrugsState,drugs:Drugs){
//             state.editDrugs=drugs;
//         }
//     }
// }
// const drugsModule=new DrugsModule();
// export default drugsModule;


import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import Drugs from '../../entities/generalControlModule/pmedicines'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import api from '@/lib/api'
import Pmedicines from '../../entities/generalControlModule/pmedicines'


interface DrugsState extends ListState<Drugs>{
    editDrugs:Drugs; 
    createDrugsData:Drugs;
    treeData:any,
    dosingWay:any,
    units:any
}
class DrugsModule extends ListModule<DrugsState,any,Drugs>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Pmedicines>(),
        loading:false,
        editDrugs:new Drugs(),
        createDrugsData:new Drugs(),
        treeData:new Array(),
        dosingWay: new Array(),
        units:new Array()
    }
    actions={
        async GetDG(context:ActionContext<DrugsState,any>,payload:any) {
            console.log("获取目录请求的参数为",payload)
            let respose = await api.DrugsApi.GetDG(payload.data); 
            context.state.treeData = (respose as any).data.result;
        },
        /**
         * 获取投药方式
         * @param context 
         * @param payload 
         */
        async GetDosingWay(context:ActionContext<DrugsState,any>,payload:any) {
            let respose = await api.DrugsApi.GetDosingWay(payload.data); 
            context.state.dosingWay = (respose as any).data.result;
        },
        /**
         * 单位
         * @param context 
         * @param payload 
         */
        async GetUnit(context:ActionContext<DrugsState,any>,payload:any) {
            let respose = await api.DrugsApi.GetDosingWay(payload.data); 
            context.state.units = (respose as any).data.result;
        },
        async getAll(context:ActionContext<DrugsState,any>,payload:any){
            context.state.loading=true;
            let reponse=await api.DrugsApi.GetPmedicinesPages(payload.data);
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Pmedicines>; 
            context.state.totalCount=page.totalCount;
            context.state.list=page.result;
        },
        async create(context:ActionContext<DrugsState,any>,payload:any){
            await api.DrugsApi.Create(payload.data);
        },
        async update(context:ActionContext<DrugsState,any>,payload:any){
            await api.DrugsApi.Update(payload.data);
        },
        async delete(context:ActionContext<DrugsState,any>,payload:any){
            await api.TenantApi.Delete(payload.data.id);
        },
        async get(context:ActionContext<DrugsState,any>,payload:any){
            let reponse=await api.TenantApi.Get(payload.id);
            return reponse.data.result as Drugs;
        },
        async LessuePmedicines(context:ActionContext<DrugsState,any>,payload:any){
            let reponse=await api.DrugsApi.LessuePmedicines(payload.data);
            return reponse;
        }
    };
    mutations={
        setCurrentPage(state:DrugsState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:DrugsState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:DrugsState,drugs:Drugs){
            state.editDrugs=drugs;
        },
        create(state:DrugsState,drugs:Drugs){
            state.createDrugsData = drugs;
        }
    }
}
const drugsModule=new DrugsModule();
export default drugsModule;