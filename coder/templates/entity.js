const _ = require('lodash')
module.exports = _.template(`
//--------------------------- 代码自动生成开始 ----------------------------------------------------------
/*! build time: <%=new Date().toLocaleString()%> */
/*! Author: yhli                                 */
/*! Email: liyahui360@163.com                    */
import Entity from './entity'

export default class <%=name%> extends Entity<number>{
    <%_.each(items, function(item, i){%>
        <%=i%> : <%=item%>
    <%})%> 
}
//--------------------------- 代码自动生成结束 ----------------------------------------------------------
`)