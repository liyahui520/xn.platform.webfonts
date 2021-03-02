import {Store,Module,ActionContext} from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import LessueOrg from '../../entities/generalControlModule/lessueorg'
import api from '@/lib/api'
interface LessueOrgState extends ListState<LessueOrg>{ 

}
class LessueOrgModule extends ListModule<LessueOrgState,any,LessueOrg>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array(),
        loading:false
    };
    actions={
       /**
       * 获取生产商
       * @param context 
       * @param payload 
       */
        async GetLessusOrgList(context:ActionContext<LessueOrgState,any>) {
            let respose = await api.LessueApi.GetLessusOrgList(); 
            context.state.list=(respose as any).data.result;
        },
    };
}
const lessueOrgModule=new LessueOrgModule();
export default lessueOrgModule;