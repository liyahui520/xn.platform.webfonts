/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-02-04 13:55:27
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const LessueOrgApi = {
    //获取下发机构id
    async GetLessusOrgList () {
        return await Ajax.get('/api/services/app/LessusOrgService/GetLessusOrgList');
    },

}

export default LessueOrgApi;