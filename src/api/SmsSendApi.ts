//--------------------------- 代码自动生成 -----------------------------------------------------
/*! build time: 2020-9-10 15:00:01 */
/*! Author: yhli                                 */
/*! Email: liyahui360@163.com                    */
import Ajax from '@/lib/ajax'

// store module
const SmsSend = {

  //创建短信记录
  async CreateTask(params: any) {
    return await Ajax.post('/api/services/app/SMSService/CreateTask', params);
  }, //删除短信记录
  async DeleteTask(params: any) {
    return await Ajax.get('/api/services/app/SMSService/DeleteTask', params);
  },
  //查询短信记录
  async GetAllTask(params: any) {
    return await Ajax.get('/api/services/app/SMSService/GetAll', params);
  },
}

//--------------------------- 代码自动生成结束 ----------------------------------------------------------
