import config from './config'
import request from './request'
import validators from './validators'
import lodash from 'lodash'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * 格式化对象中的日期为字符串
 * @param  {} para 对象
 */
const formatDateField = (para) => {
    for (var field in para) {
        if (para.hasOwnProperty(field)) {
            var element = para[field];
            if(element instanceof Date){
                para[field] = (!para[field] || para[field] == '') ? '' : new Date(para[field]).format('yyyy-MM-dd')
            }
        }
    }
}

/**
 * 将string转为datetime，不能使用new Date("yyyy-MM-dd"),iOS不支持带有-的格式
 * @param  {} text
 */
const parseDate = (text) => {
  let isString = typeof(text) === "string";
  if(!text || !text.trim()) return "";
  return isString ? new Date(text.replace(/-/g, "/")) : text;
}

/**
 * 把对象中的日期字符串转换为时间
 * @param  {} para 对象
 */
const parseDateField = (para, ...fieldNames) => {
    fieldNames.forEach(field => {
      para[field] = parseDate(para[field])
    })
}

/**
 * 从级联选择器中获取选中项的显示文本
 * @param  {} data 级联选择器数据
 * @param  {} value 选中项
 */
const getCascaderSelectedName = (data, value) => {
  let departmentName = [];

  let currentId = value[0]
  let list = data

  for (var index = 0; index < value.length; index++) {
    currentId = value[index];
    let currentItem = list.find(d => d.value == currentId)

    departmentName.push(list.find(d => d.value == currentId).name)

    if(currentItem.children && currentItem.children.length && currentItem.children.length > 0){
      list = currentItem.children
    }
  }
  
  return departmentName
}

/**
 * 从字典数据中获取选中项的显示文本
 * @param  {} data 字典数据
 * @param  {} value 选中项
 * @param  {} valueFieldName 值字段名称
 * @param  {} value 文本字段名称
 */
const getDictItemName = (data, value, valueFieldName='value', textFieldName='name') => {
  return data.find(o => o[valueFieldName] == value)[textFieldName]
}


module.exports = {
  config,
  request,
  queryURL,
  queryArray,
  arrayToTree,
  formatDateField,
  parseDate,
  parseDateField,
  getCascaderSelectedName,
  getDictItemName,
  validators,
}
