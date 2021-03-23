import router from 'umi/router'
import _ from 'lodash';
import { AnyAction, ReducersMapObject } from 'redux'
import { EffectsMapObject, ReducersMapObjectWithEnhancer, SubscriptionsMapObject } from 'dva'
import BaseModel from '@/dva/baseModel'


class GlobalModel extends BaseModel {
  namespace = 'global'
  state: any = {
    isAuthorized: false, // 认证
    loginInfo: {},
    userInfo: {}, // 登录用户信息
  }
  effects: EffectsMapObject = {
  }

  reducers: ReducersMapObject | ReducersMapObjectWithEnhancer = {
    ...this.reducers,

    getSuccess(state, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}

export default new GlobalModel()
