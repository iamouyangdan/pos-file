// @ts-nocheck
/*
 * @Description: 
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

function toFirstWordUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
function toHump(name) {
  let _name =  name.replace(/[_-](\w)/g, function(all, letter){
      return letter.toUpperCase();
  });
  return toFirstWordUpperCase(_name)
}

const getServiceText = (name) => {
  return `
import ${name}Model from '@/models/${name}Model'

import StaffStore from '@/store/module/staff.store'

import {PollController} from '@/services/PollService'
import {Printer} from '@/services/PrinterService'

import {transPrice, deepCopySingle, formatDate, accMul} from '@/utils/common'

class ${name}Service {
    
}

export default new ${name}Service()
  `
}
const getViewText = (name) => {
  return `
  <template>
  <div class="container">
        <!--页面公共头部-->
        <header>
            <slot name="header">
                <Header />
            </slot>
        </header>
        <!--页面内容-->
        <main class="ui_content">
        </main>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import Header from '@/components/setting/Header.vue'

import { eventBusKey } from "@/config/constant";
import OrderService, {
  Order, 
  OrderItem
} from "@/services/OrderService";
import ConfigService from '@/services/ConfigService'
import { isFunction, transPrice,  accMul, formatDate} from "@/utils/common";
import AppStore from "@/store/module/app.store";
import OrderStore from "@/store/module/order.store";
@Component({
  components: {
    Header,
  }
})
export default class ${name} extends Vue { // 查交易
  
  async created() {
    // 键盘监听
    this.$bus.$on(eventBusKey.ON_KEYBOARD, (key: string, event: any) => {
      console.log("${name} key=" + key + ", event=" + JSON.stringify(event));
      this.action(key);
    }); 

    this.init()
  }
  mounted() {
    
  }
  async init() {
  }
  async search() {
  }
  
  
  
  action(key: string) {  
      if(key === 'F1') return this.search()
      if(key === 'Escape') return this.back()
      if(key === 'Enter') return this.enter()
  }
 

  back() {
      this.$router.go(-1)
  }
  async enter() {
      // return this.back()
  }
  
  destroyed() {  
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
.container{
    display: flex;
    flex-direction: column;
    height: 100%;
    &>.ui_content{
        display: flex;
        flex: 1;
    }
}
</style>
  `
}


const getApiText = (name) => {
  return `
import http from '@/utils/http'
import { deepStringify } from '@/utils/common'
/**
 * http方法返回值为Promise，参数格式为
 * http({
 *   timeout: 3000,
 *   url: '',
 *   method: 'get',
 *   data: {}
 * })
 */
export default {

}
  `
}

const getPopupText = (name) => {
  return  `
<template>
  <div class="ui-popup">
      
  </div>
</template>
<script lang="ts">
  // class-style组件
  import { Component, Prop, Vue, Emit , Watch} from "vue-property-decorator";
  import {eventBusKey} from '@/config/constant'
  import {isFunction, accMul, uuid, deepCopySingle, transPrice} from '@/utils/common'
  import OrderService, {Order} from '@/services/OrderService'
  import OrderStore, {OrderPaymentParams} from '@/store/module/order.store'
  
  @Component({
    props: {
        config: {}
    },
    components: {
    }
  })
  export default class ${name}Popup extends Vue {
    
      async created() {
          // 禁用键盘事件，关闭弹窗时恢复，即在close()中恢复 (存在多个弹窗时，使用组件实例唯一值this._cid标识当前弹窗，否则关闭上层弹窗后当前弹窗的禁用会失效)
          this.$bus.$emit(eventBusKey.ON_DISABLE_KEYBOARD);
          this.$bus.$on(eventBusKey.ON_SUB_KEYBOARD, (key: string, event: any) => {
              console.log("${name}Popup key=", key);
              this.action(key);
          });
      }
      mounted() {
      }
      
    action(key: string) {
          if(key === 'Escape') return this.cancel()
          if(key === 'Enter') return this.enter()
          this.showPopup(key)
      }
      enter() {
          // 操作成功后 关闭弹窗
          // this.close()
      }
      showPopup(key: string) {
          console.log('快捷键key ', key)
      }
      btnClick(code:string) {
          this.action(code)
      }
      async cancel() {
          this.close()
      }
      // 恢复键盘事件，关闭弹窗
      close() {
          this.$bus.$emit(eventBusKey.ON_RECOVERY_KEYBOARD);
          this.$bus.$offLast(eventBusKey.ON_SUB_KEYBOARD)
          this.remove()
      }
      destroyed () {
      }
  }
</script>
<style lang="scss" scoped>
  @import '@/styles/variable.scss';
  
</style>
  `
}

const getDaoText = (tableName, upperCaseTableName) => {
  return {
    config: 
    `
import {
  Sequelize
} from '@/utils/init'
  
export default {
    table: '${tableName}',
    name: '',
    comment: '',
    sync: true,
    force: false,
    fieldInfo: {
    }
}
    `,
    dao: 
    `
import CommonDao from "../../_core/CommonDao";

import {
    Sequelize,
} from '@/utils/init'


const Op = Sequelize.Op

// 参考文档：https://www.sequelize.com.cn/core-concepts/model-querying-basics
class ${upperCaseTableName}Dao extends CommonDao{
}

export default new ${upperCaseTableName}Dao()
    `,

  }
}

const getModelText = (dbName, tableName, upperCaseTableName) => {
  let str =  `
import ${upperCaseTableName}Dao from '@/models/dao/${dbName}/${tableName}/${upperCaseTableName}Dao'

import { Sequelize } from '@/utils/init'
import CommonDao from './dao/_core/CommonDao'
const Op = Sequelize.Op
class ${upperCaseTableName}Model {
    constructor() {
    }
}

export default new ${upperCaseTableName}Model()
  `
  
  return str
}


module.exports = {
  getApiText,
  getDaoText,
  getModelText,
  getServiceText,
  getViewText,
  getPopupText
}