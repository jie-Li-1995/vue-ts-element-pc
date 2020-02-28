import { Message } from 'element-ui'

export interface BaseObject {
  IsAcceptVisitRecord: number;
  roles: string[];
  RolesSign: string[];
  Industrys: string[];
  [propName: string]: string | number | boolean | string[];
}

export const token = {
  set: function (t: string): void {
    window.localStorage.setItem('token', t)
  },
  get: function (): string {
    return window.localStorage.getItem('token') || ''
  },
  clear: function (): void {
    window.localStorage.removeItem('token')
  }
}

export const userInfo = {
  set: function (u: object): void {
    window.localStorage.setItem('userInfo', JSON.stringify(u))
  },
  get: function (): object {
    const user: string = window.localStorage.getItem('userInfo') || ''
    return JSON.parse(user)
  },
  clear: function (): void {
    window.localStorage.removeItem('userInfo')
  }
}

export const roles = {
  check: function (role: string) {
    let disabled = true
    const roles = (userInfo.get() as BaseObject).RolesSign
    const rList: string[] = role.split('|')
    for (let i = 0; i < rList.length; i++) {
      if (roles.includes(rList[i])) {
        disabled = false
        break
      }
    }
    return disabled
  }
}

export const role = {
  set: function (u: [string]): void {
    window.localStorage.setItem('role', JSON.stringify(u))
  },
  get: function (): [string] {
    const user: string = window.localStorage.getItem('role') || ''
    return JSON.parse(user)
  },
  clear: function (): void {
    window.localStorage.removeItem('role')
  }
}

export const checkString = {
  IsPass: function (str = '', warn1: string, warn2?: string, strLength?: number): boolean {
    let len = 0
    if (str.length === 0) Message.warning(warn1)
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i)
      // 单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        len++
      } else {
        len += 2
      }
    }
    if (strLength) {
      if (len > strLength) {
        if (typeof warn2 === 'string') Message.warning(warn2)
        return false
      }
    }
    return true
  }
}
