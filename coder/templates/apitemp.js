// store.js文件
const _ = require('lodash')
module.exports = _.template(`
/*! build time: <%=new Date().toLocaleString()%> */ 
import Ajax from '@/lib/ajax'
// store module

const <%=name%> = {
    <%_.each(items, function(item, i){%>

        //<%=item.title%>
        <%if(item.isGet){%>
        async <%=item.tostate%> (params: any) {
            return await Ajax.<%=item.httpMethod%>('<%=item.url%>?<%=item.getParam%>='+params);
        },
        <%} else if(item.ajaxParam){ %>
        async <%=item.tostate%> (params: any) {
            return await Ajax.<%=item.httpMethod%>('<%=item.url%>',params);
        },
        <%} else {%>
        async <%=item.tostate%> () {
            return await Ajax.<%=item.httpMethod%>('<%=item.url%>');
        },
        
        <%}%>
    <%})%>

}
 
`)