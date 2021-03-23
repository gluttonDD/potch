export const regExpRules:{ [propName : string] : RegExp } = {
  mobile: /^(1\d{10})?$/,
  insPassword: /^(?![0-9\-]+$)(?![A-Za-z\-]+$)[A-Za-z0-9\-]{6,20}$/, //必须同时包含字母和数字
  userName: /^(?![0-9]+$)[A-Za-z0-9]{6,20}$/,
  specialStr: /^[^@\/\'\\\"#<>$%&\^\*]+$/,
  engName: /^[a-zA-Z .,]*$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  USCC: /^[A-Za-z0-9\-]{18}$/,
  money: /(^[1-9](\d{1,9})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
  percentage: /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)|(^100.0$)|(^100.00$)/,
  positiveInteger: /^([0]|[1-9]\d*)$/, // 正整数
  decimalNumber: /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){0,2})?$/, // 保留两位小数
  rate: /^100$|^(\d|[1-9]\d)$/, // 费率, ^100$|^(\d|[1-9]\d)(\.\d+)*$
  numWorldGroup: /^[A-Za-z0-9]+$/,  // 数字字母
  endorsementMoney: /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/,// 正负且两位小数
  name: /^[\u4E00-\u9FA5]{2,100}$/,  //最少两位汉字
  tel: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,7})?$/,
  integer: /^[1-9]\d*$/
}

export default class Validator {

  // 电话号码,区号3位或4位，号码7位或8位，区号与电话号码之间用小括号或“-”隔开
  static validateTel(rule: any, value : string, callback : Function) {
    if(value && value.length > 0){
      if (regExpRules.tel.test(value)) {
        callback()
      }
      else {
        callback(new Error('请输入正确的电话号码'))
      }
    }
    else {
      callback()
    }
  }

  // 手机号码
  static validateMobile(rule : any, value : string, callback : Function) {
    if (value && value.length > 0) {
      if (regExpRules.mobile.test(value)) {
        callback()
      } else {
        callback([new Error('请输入正确的手机号码')])
      }
    }
    else {
      callback()
    }
  }

  // 通用不能包含特殊字符校验
  static validateSpecialStr(rule : any, value : string, callback : Function) {
    if (value && value.length > 0) {
      if (regExpRules.specialStr.test(value)) {
        callback()
      } else {
        callback(new Error('不能包含特殊字符'))
      }
    } else {
      callback()
    }
  }

  // 英文名
  static validateEngName(rule : any, value : string, callback : Function){
    if (value && value.length > 0) {
      if (regExpRules.engName.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的英文名/拼音'))
      }
    } else {
      callback()
    }
  };

  //中文姓名，最少两个汉字
  static validateChinaName(rule : any, value : string, callback : Function) {
    if (value && value.length > 0) {
      if(regExpRules.name.test(value)){
        callback()
      }
      else {
        callback(new Error('请输入至少两个汉字'))
      }
    }
    else {
      callback()
    }
  };

  // 通用用户名校验
  static validateUserName(rule : any, value : string, callback : Function) {
    if (value && value.length > 0) {
      if(regExpRules.userName.test(value)){
        callback()
      }
      else {
        callback(new Error('请输入6-20位英文字母、数字，必须包含字母'))
      }
    }
    else {
      callback()
    }
  }

  //密码校验
  static validatePassword (rule : any, value : string, callback : Function) {
    if (value && regExpRules.insPassword.test(value)) {
      callback()
    }
    else {
      callback('请输入6-20位数字、字母或连字符，必须包含数字和字母')
    }
  };

  // 新的密码校验
  static validateNewPassword(rule : any, value : string, callback : Function) {
    if (value && checkPwd(value)[0]) {
      callback()
    }
    else {
      callback(checkPwd(value)[1])
    }
  }

  // 通用身份证号校验
  static validateIdCard(rule : any, value : string, callback : Function) {
    if (value && (typeof value === 'string') && value.trim().length > 0) {  // 单纯空格不触发校验
      if (checkIdCard(value.trim())) {
        callback()
      } else {
        callback(new Error('请输入正确的身份证号码'))
      }
    } else {
      callback()
    }
  }

  // 统一社会信用代码
  static validateUSCC(rule : any, value : string, callback : Function){
    if (value && (typeof value === 'string') && value.trim().length > 0) {  // 单纯空格不触发校验
      if (value && regExpRules.USCC.test(value.trim())) {
        callback()
      } else {
        callback(new Error('请输入正确的统一社会信用代码'))
      }
    } else {
      callback()
    }
  }

  // 金额
  static validateMomeny(rule : any, value : string, callback : Function){
    if (regExpRules.money.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的金额'))
    }
  }

  // 正整数
  static validateInteger(rule : any, value : string, callback : Function){
    if (regExpRules.integer.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确正整数'))
    }
  }


  // 百分数，保留两位小数
  static validatePercentage(rule : any, value : string, callback : Function){
    if (regExpRules.percentage.test(value)) {
      callback()
    } else {
      callback(new Error('请输入最多两位小数的百分数'))
    }
  }

  // 邮箱
  static validateEmail(rule : any, value : string, callback : Function){
    if (!!value) {
      if (regExpRules.email.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱'))
      }
    }
    else {
      callback()
    }
  }

  //电话或者手机号码
  static validateMobileTel(rule : any, value : string, callback : Function) {
    if (!!value) {
      if (!(regExpRules.tel.test(value)) && !(regExpRules.mobile.test(value))) {
        callback([new Error('请输入正确的联系方式')]);
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
}

