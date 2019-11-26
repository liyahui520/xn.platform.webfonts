const _ = require('lodash')
module.exports = _.template(`
/*! build time: <%=new Date().toLocaleString()%> */

import Entity from './entity'

export default class <%=name%> extends Entity<number>{
    <%_.each(items, function(item, i){%>
        <%=i%> : <%=item%>
    <%})%> 
}`)