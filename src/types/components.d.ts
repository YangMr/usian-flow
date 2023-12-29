import UDemo from '@/components/u-demo/u-demo.vue'
import IList from '@/components/i-list/i-list.vue'
// declare module "vue" {
//   export interface GlobalComponents {
//     UDemo: typeof UDemo;
//     IList: typeof IList;
//   }
// }

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    UDemo: typeof UDemo
    IList: typeof IList
  }
}
