/*
 * @Author: cctong
 * @Email: yhli@yeah.net
 * @Date: 2020-09-27
 * @Last Modified by:  
 * @Last Modified time:  
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const CmembersCardApi = {
    //获取会员卡列表
    async GetList (params: any) {
        return await Ajax.post('/api/services/app/CmembersCardService/GetCmemAll',params);
    },
   
}

export default CmembersCardApi;