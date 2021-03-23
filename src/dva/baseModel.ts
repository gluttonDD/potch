import { Model, ReducersMapObjectWithEnhancer } from 'dva'
import { ReducersMapObject } from 'redux'
import { EffectsMapObject } from 'dva'

export default class BaseModel implements Model {
  namespace: string = ''
  state:object = {
  }

  reducers: ReducersMapObject | ReducersMapObjectWithEnhancer = {
    updateState (state, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  }
  effects: EffectsMapObject = {

  }
}
