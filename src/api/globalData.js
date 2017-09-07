import { request, config } from '../utils'
const { api } = config
const { globalData } = api

let cityList = null
let dictList = null
let hospitalList = null
let departmentList = null
let outworkerList = null

export async function getCities () {
  if (!cityList) {
    return request({
      url: globalData.getCities,
      method: 'post',
    }).then(val => {
      if (val.success) {
        cityList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: cityList,
  })
}


export async function getHospitalList () {
  if (!hospitalList) {
    return request({
      url: globalData.getHospitalList,
      method: 'post',
    }).then(val => {
      if (val.success) {
        hospitalList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: hospitalList,
  })
}

export async function getOutworkerList () {
  if (!outworkerList) {
    return request({
      url: globalData.getOutworkerList,
      method: 'post',
    }).then(val => {
      if (val.success) {
        outworkerList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: outworkerList,
  })
}

export async function getDepartmentList () {
  if (!departmentList) {
    return request({
      url: globalData.getDepartmentList,
      method: 'post',
    }).then(val => {
      if (val.success) {
        departmentList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: departmentList,
  })
}

export async function getAllDict () {
  if (!dictList) {
    return request({
      url: globalData.getDictList,
      method: 'post',
    }).then(val => {
      if (val.success) {
        dictList = val.data
      }
      return val
    })
  }
  return Promise.resolve({
    success: true,
    data: dictList,
  })
}

export async function getDict (type) {
  try {
    const ret = await getAllDict()
    if (ret.success) {
      return {
        success: true,
        data: ret.data.find(i => i.value === type),
      }
    }
    return {
      success: false,
      data: null,
    }
  } catch (ex) {
    return Promise.resolve({
      success: false,
      data: null,
    })
  }
}

