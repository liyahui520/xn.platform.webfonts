declare global {
    interface RouterMeta {
        title: string;
    }
    interface Router {
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import login from '@/views/login.vue'
import home from '@/views/home/home.vue'
import main from '@/views/main.vue'
import fuyoupay from '@/views/setting/payment/fuyou/index.vue'

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/components/lockscreen/components/locking-page.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component: () => import('@/views/login.vue')
}; 
export const homeRouter: Router = {
    path: '/home',
    name: 'home',
    meta: {
        title: 'home'
    },
    component: () => import('@/views/index.vue')};
export const paymentRouter: Router = {
    path: '/fuyoupay',
    name: 'fuyoupay',
    meta: {
        title: 'FuYouPay'
    },
    component: () => import('@/views/setting/payment/fuyou/index.vue')
};
export const aibokeRouter: Router = {
    path: '/aiboke',
    name: 'aiboke',
    meta: {
        title: 'Aiboke'
    },
    component: () => import('@/views/setting/activity/aiboke/index.vue')
};
export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: 'ManageMenu' },
    component: main,
    children: [
        { path: 'home', meta: { title: 'HomePage' }, name: 'home', component: () => import('@/views/home/home.vue') }
    ]
}
export const appRouters: Array<Router> = [{
    path: '/setting',
    name: 'setting',
    permission: '',
    meta: { title: 'ManageMenu' },
    icon: '&#xe735;',
    component: main,
    children: [
        { path: 'consumption', permission: 'Pages.Consumption', meta: { title: 'Consumption' }, name: 'consumption', component: () => import('@/views/setting/consumption/consumption.vue') }
        //,{ path: 'chargehistory', permission: 'Pages.ChargeHistory', meta: { title: 'ChargeHistory' }, name: 'chargehistory', component: () => import('@/views/setting/chargehistory/index.vue') }
    ]
},
{
    path: '/sys',
    name: 'sys',
    permission: '',
    meta: { title: 'SysSetting' },
    icon: '&#xe6d5;',
    component: main,
    children: [
        { path: 'orglist', permission: 'Pages.Orglist', meta: { title: 'Orglist' }, name: 'orglist', component: () => import('@/views/setting/orglist/index.vue') },
        { path: 'user', permission: 'Pages.Users', meta: { title: 'Users' }, name: 'user', component: () => import('@/views/setting/user/user.vue') },
        { path: 'role', permission: 'Pages.Roles', meta: { title: 'Roles' }, name: 'role', component: () => import('@/views/setting/role/role.vue') },
        { path: 'tenant', permission: 'Pages.Tenants', meta: { title: 'Tenants' }, name: 'tenant', component: () => import('@/views/setting/tenant/tenant.vue') }
        // { path: 'hangfre', permission: 'Pages.Tenants', meta: { title: 'hangfre' }, name: 'hangfre', component: () => import('@/views/hangfire/hangfire.vue') }
    ]
},{
    path: '/cmem',
    name: 'cmem',
    permission: '',
    meta: { title: 'Cmembers' },
    icon: '&#xe74a;',
    component: main,
    children: [
        { path: 'cmemberscard', permission: 'Pages.Users', meta: { title: 'Users' }, name: 'cmemberscard', component: () => import('@/views/cmemberscard/index.vue') }
    ]
},{
    path: '/zk',
    name: 'zk',
    permission: '',
    meta: { title: 'ZK_Pmedicines' },
    icon: '&#xe76e;',
    component: main,
    children: [
        { path: 'drugs', permission: 'Pages.ZK_Pmedicines_Drugs', meta: { title: 'ZK_Pmedicines_Drugs' }, name: 'ZK_Pmedicines_Drugs', component: () => import('@/views/generalControlModule/drugs/drugs.vue') },
        { path: 'consumables', permission: 'Pages.ZK_Pmedicines_Consumables', meta: { title: 'ZK_Pmedicines_Consumables' }, name: 'ZK_Pmedicines_Consumables', component: () => import('@/views/generalControlModule/consumables/consumables.vue') },
        { path: 'beauty', permission: 'Pages_ZK_Pmedicines_Beauty', meta: { title: 'ZK_Pmedicines_Beauty' }, name: 'ZK_Pmedicines_Beauty', component: () => import('@/views/generalControlModule/beauty/beauty.vue') },
        { path: 'clean', permission: 'Pages_ZK_Pmedicines_Clean', meta: { title: 'ZK_Pmedicines_Clean' }, name: 'ZK_Pmedicines_Clean', component: () => import('@/views/generalControlModule/clean/clean.vue') }
    ]
}
,{
    path: '/abk',
    name: 'abk',
    permission: '',
    meta: { title: 'ActivityManagement' },
    icon: '&#xe60c;',
    component: main,
    children: [
        { path: 'abk', permission: 'Pages.AiBoKe',icon: '&#xe60c;', meta: { title: 'AiBoKe' }, name: 'AiBoKe', component: () => import('@/views/setting/activity/aiboke/aiboke.vue') }
    ]
}
]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters, 
    homeRouter,
    paymentRouter ,
    aibokeRouter
];
