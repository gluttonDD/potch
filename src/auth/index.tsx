import React, {useCallback, useEffect, useMemo} from 'react'
import moment from 'moment-timezone'
import {IRoute} from 'umi-types'
import {checkAuth} from '@/auth/helper'
import {useDispatch} from 'react-redux'
import {RouteData} from "umi/router";

type IProps = {
  children: any
  location: RouteData
  route: IXRoute
}

export interface IXRoute extends IRoute{
  // 是否同步检验权限，默认否，同步校验时会阻塞后续页面
  syncValidAuth?: boolean
}

const Auth = (props: IProps) => {
  const { children, location, route } = props
  const dispatch = useDispatch()
  const { pathname } = location
  const currentRoute = useMemo(() => findRoute(route, pathname), [pathname, route])
  return children
}

const findRoute = (route: IXRoute, pathname: string): IXRoute | null => {
  if (route.exact && route.path === pathname) {
    return route
  }
  if (!route.routes) {
    return null
  }
  for (let i = 0; i < route.routes.length; i++) {
    const target = findRoute(route.routes[i], pathname)
    if (target) {
      return target
    }
  }
  return null
}

export default Auth
