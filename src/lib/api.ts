/*
 * @Author: yhli
 * @Email: liyahui360@163.com
 * @Date: 2019-11-24 21:29:44
 * @Last Modified by: yhli
 * @Last Modified time: 2019-11-25 14:17:41
 * @Description: 接口统一出口
 * api接口的出口，这样就可以把api接口根据功能划分为多个模块，利于多人协作开发，比如一个人只负责一个模块的开发等，还能方便每个模块中接口的命名
 */
//基础接口
import BaseApi from '@/api/base'
//权限
import RoleApi from '@/api/RoleApi'
//租户
import TenantApi from '@/api/TenantApi'
//用户
import UserApi from '@/api/UserApi'
// 消费记录
import ConsumptionApi from '@/api/ConsumptionApi'

export default {
    BaseApi,
    RoleApi,
    TenantApi,
    UserApi,
    ConsumptionApi
}