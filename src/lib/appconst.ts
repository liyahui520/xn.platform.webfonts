import url from './url'
const AppConsts= {
    userManagement:{
        defaultAdminUserName: 'admin'
    },
    localization:{
        defaultLocalizationSourceName: 'Platform'
    },
    authorization:{
        encrptedAuthTokenName: 'enc_auth_token'
    },
    appBaseUrl: "http://localhost",
    remoteServiceBaseUrl:url.endsWith('/') ? url.slice(0, -1) : url
}
export default AppConsts