/*! build time: 2019-11-26 4:40:21 PM */
import Ajax from '@/lib/ajax'

// store module
const test = {

  //菜单
  async GetMenu(params: any) {
    return await Ajax.post('/menu/getMenu', params);
  }, //菜单1
  async GetMenu1(params: any) {
    return await Ajax.get('/menu/getMenu1?id=' + params);
  },
}
