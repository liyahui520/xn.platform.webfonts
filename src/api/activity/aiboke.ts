/*
 * @Author: cctong
 * @Email: tongchuanchuan@yeah.net
 * @Date: 2020-09-23 
 * @Last Modified by: yhli
 * @Last Modified time: 2021-01-29 10:01:40
 * @Description: 接口提供
 */

import Ajax from '@/lib/ajax'

const AiBoKeApi = {
    //获取爱波克活动内容
    async GetAiBokeAitivity (params: any) {

        return await Ajax.post('/api/services/app/AiBoKeService/GetAiBokeAitivity',params.data);

    }
}

export default AiBoKeApi;