import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import AiBoKe from '../../entities/activity/aiboke'
import api from '@/lib/api'

interface AiBoKeState extends ListState<AiBoKe>{ 
    AiBoKeData:any
}
class AiBoKeModule extends ListModule<AiBoKeState,any,AiBoKe>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array(),
        loading:false
    }
    actions={
       /**
       * 获取爱波克活动数据
       * @param context 
       * @param payload 
       */
        async GetAiBokeAitivity(context:ActionContext<AiBoKeState,any>,payload:any) {
            console.log("请求的参数为",payload)
            let respose = await api.AiBoKe.GetAiBokeAitivity(payload); 
            context.state.list=(respose as any).data.result;
        }
    };
    mutations={
        //设置当前页
        setCurrentPage(state:AiBoKeState,page:number){
            state.currentPage=page;
        },
        //设置页容量
        setPageSize(state:AiBoKeState,pagesize:number){
            state.pageSize=pagesize;
        }
    }
}
const aiBoKeModule=new AiBoKeModule();
export default aiBoKeModule;