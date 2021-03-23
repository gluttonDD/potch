import { history } from 'umi';
import BaseModel from '@/dva/baseModel'
import {EffectsMapObject} from 'dva'

class LoginModel extends BaseModel {
  namespace = 'login'
  state = {}
  effects: EffectsMapObject = {
    * login ({ payload }, { put, call, select }) {
      history.push('/dashboard')
    },
  }

}

export default new LoginModel()
