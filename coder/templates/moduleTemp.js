const _ = require('lodash')
module.exports = _.template(`
//--------------------------- 代码自动生成开始 ----------------------------------------------------------
/*! build time: <%=new Date().toLocaleString()%> */
/*! Author: yhli                                 */
/*! Email: liyahui360@163.com                    */
import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import <%=modelname%> from '../entities/<%=name%>'
// import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import api from '@/lib/api'
interface <%=modelname%>State extends ListState<<%=modelname%>>{
    edit<%=modelname%>:<%=modelname%>;
    permissions:Array<string>
}
class <%=modelname%>Module extends ListModule<<%=modelname%>State,any,<%=modelname%>>{
    state={
        <%if(ispage){%>
        totalCount:0,
        currentPage:1,
        pageSize:10,
        <%}%>
        list: new Array<<%=modelname%>>(),
        loading:false,
        edit<%=modelname%>:new <%=modelname%>()
    }
    actions={
        <%_.each(items, function(item, i){%>
            //<%=item.title%>
            async <%=item.state%>(context:ActionContext<<%=modelname%>State,any><%=item.ajaxParam?',payload:any':''%>){
                <%if(item.page){%>
                    context.state.loading=true;
                    let reponse=await api.<%=modelname%>Api.<%=item.tostate%>(<%=item.ajaxParam?'payload.data':''%>);
                    context.state.loading=false;
                    let page=reponse.data.result as PageResult<<%=modelname%>>;
                    context.state.totalCount=page.totalCount;
                    context.state.list=page.items;
                <%} else{%>
                    await api.<%=modelname%>Api.<%=item.tostate%>(<%=item.ajaxParam?'payload.data':''%>);
                <%}%>
                
            },
        <%})%> 
    };
    mutations={
        <%if(ispage){%>
        setCurrentPage(state:<%=modelname%>State,page:number){
            state.currentPage=page;
        },
        setPageSize(state:<%=modelname%>State,pagesize:number){
            state.pageSize=pagesize;
        },
        <%} %>
        edit(state:<%=modelname%>State,<%=modelname%>:<%=modelname%>){
            state.edit<%=modelname%>=<%=modelname%>;
        }
    }
}
const <%=name%>Module=new <%=modelname%>Module();
export default <%=name%>Module;
//--------------------------- 代码自动生成结束 ----------------------------------------------------------
`)