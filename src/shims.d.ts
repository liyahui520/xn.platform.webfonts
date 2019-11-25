import Vue, { VNode } from 'vue'
declare module '*.vue' {
   export default Vue
  // interface Vue{
  //   $AjaxApi:AxiosInstance
  // }
}
// declare module '*' {
//   interface Vue {
//     $axios: AxiosInstance
//     $utils: object
//     $AjaxApi:object
//   }
// }
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  interface Window {
    abp:any
  }

  
}
