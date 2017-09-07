import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { config } from '../utils';
import { LoginUsers, Users } from './data/user';
import { orders } from './data/order';
import { workers } from './data/worker';
import { hospitalList } from './data/hospital';
import CITIES from './data/city';
import { DICTS } from './data/dict';
import { departments } from './data/department';
import { outworkerList } from './data/outworker';

let { api } = config
let { user, order, worker, globalData } = api

let _Users = Users;
let _Orders = orders;
let _Workers = workers;
let _Dicts = DICTS;
let _Cities = CITIES;
let _HospitalList = hospitalList;
let _Departments = departments;
let _OutworkerList = outworkerList;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {

    const setDictNameValue = (obj, dictName, fieldValueName, fieldDispName) => {
      fieldValueName = fieldValueName || dictName
      fieldDispName = fieldDispName || fieldValueName + "Name"

      const val = obj[fieldValueName]
      let dictItemName = val
      const dict = _Dicts.find(d => {
        return d.value == dictName
      })
      if(dict){
        const dictItem = dict.items.find(i => {
          return i.value == val
        })
        if(dictItem){
          dictItemName = dictItem.name
        }
      }
      obj[fieldDispName] = dictItemName
    }


    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost(user.requestLogin).reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { errorCode: 0, data: user }]);
          } else {
            resolve([200, { errorCode: 10, errorMsg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet(user.getUserList).reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            data: {
              users: mockUsers
            }
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet(user.getUserListPage).reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            data: {
              total: total,
              users: mockUsers
            }
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet(user.removeUser).reply(config => {
      let { id } = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet(user.batchRemoveUser).reply(config => {
      let { ids } = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet(user.editUser).reply(config => {
      let { id, name, addr, age, birth, sex } = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet(user.addUser).reply(config => {
      let { name, addr, age, birth, sex } = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });

    //获取订单列表（分页）
    mock.onGet(order.getOrderList).reply(config => {
      console.log("getOrderList", config.params)
      let {page, pageSize, date, orderNumber, phone, worker, status } = config.params;
      
      pageSize = Number(pageSize) || 20
      page = Number(page) || 1

      let orderAndPayStatus = []
      if(status && status !== "0")
        orderAndPayStatus = status.split('.')
      let orderStatus = orderAndPayStatus.length > 0 ? orderAndPayStatus[0] : null
      let payStatus = orderAndPayStatus.length > 1 ? orderAndPayStatus[1] : null

      let mockOrders = _Orders.filter(order => {
        if(orderStatus){
          if(payStatus){
            return order.payStatus == payStatus && order.orderStatus == orderStatus;
          }
          else{
            return order.orderStatus == orderStatus;
          }
        }
        else{
          return true;
        }
        return true;
      });
      let total = mockOrders.length;
      mockOrders = mockOrders.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            total: total,
            data: mockOrders
          }]);
        }, 1000);
      });
    });
    //获取订单详情
    mock.onGet(order.getOrder).reply(config => {
      console.log("getOrder", config.params)
      let { id } = config.params;

      let mockData = _Orders.find(item => {
        return item.id == id;
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            data: mockData
          }]);
        }, 500);
      });
    });

    //恢复订单
    mock.onPost(order.recoverOrder).reply(config => {
      console.log("recoverOrder", config.data)

      let { id } = JSON.parse(config.data);
      let order = _Orders.find(u => u.id == id);
      order.orderStatus = "1";
      order.orderStatusName = "待派单";
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });
    //取消订单
    mock.onPost(order.cancelOrder).reply(config => {
      console.log("cancelOrder", config.data)
      
      let { id } = JSON.parse(config.data);
      let order = _Orders.find(u => u.id == id);
      order.orderStatus = "6";
      order.orderStatusName = "已取消";
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });
    //取消订单预约
    mock.onPost(order.cancelOrderAppointment).reply(config => {
      console.log("cancelOrderAppointment", config.data)
      
      let { id } = JSON.parse(config.data);
      let order = _Orders.find(u => u.id == id);
      order.orderStatus = "1";
      order.orderStatusName = "待派单";
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });

    //获取护工列表（分页）
    mock.onGet(worker.getWorkerList).reply(config => {
      console.log("getWorkerList", config.params)
      let {page, pageSize, workerId, workerName, accountStatus, workStatus } = config.params;
      
      pageSize = Number(pageSize) || 20
      page = Number(page) || 1

      let mockData = _Workers.filter(item => {
        return true;
      });
      let total = mockData.length;
      mockData = mockData.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            total: total,
            data: mockData
          }]);
        }, 1000);
      });
    });

    //获取护工详情
    mock.onGet(worker.getWorker).reply(config => {
      console.log(worker.getWorker, config.params)

      let { id } = config.params;

      let mockData = _Workers.find(item => {
        return item.id == id;
      });

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            data: mockData
          }]);
        }, 500);
      });
    });

    //创建护工详情
    mock.onPost(worker.createWorker).reply(config => {
      console.log("createWorker", config.data)

      let obj = JSON.parse(config.data)
      obj.id = Number(new Date())
      _Workers.unshift(obj) 

      setDictNameValue(obj, "sex")
      setDictNameValue(obj, "workStatus")
      setDictNameValue(obj, "education")
      setDictNameValue(obj, "serviceYears")
      setDictNameValue(obj, "bank")

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            data: obj.id
          }]);
        }, 500);
      });
    });

    //编辑护工详情
    mock.onPost(worker.editWorker).reply(config => {
      console.log("editWorker", config.data)
      let obj = JSON.parse(config.data);

      let mockData = _Workers.find(item => {
        return item.id == obj.id;
      });
      for (var key in mockData) {
        if (mockData.hasOwnProperty(key) && obj.hasOwnProperty(key)) {
          mockData[key] = obj[key]
        }
      }
      setDictNameValue(mockData, "sex")
      setDictNameValue(mockData, "workStatus")
      setDictNameValue(mockData, "education")
      setDictNameValue(mockData, "serviceYears")
      setDictNameValue(mockData, "bank")

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0,
            data: ""
          }]);
        }, 500);
      });
    });

    //删除护工
    mock.onGet(worker.removeWorker).reply(config => {
      console.log("removeWorker", config.params)

      let { id } = config.params;
      _Workers = _Workers.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errorCode: 0
          }]);
        }, 500);
      });
    });

    // 获取字典数据
    mock.onPost(globalData.getDictList).reply(config => {
      console.log("globalData.getDictList")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: _Dicts,
            errorCode: 0
          }]);
        }, 500);
      });
    });

    // 获取地区数据
    mock.onPost(globalData.getCities).reply(config => {
      console.log("globalData.getCities")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: _Cities,
            errorCode: 0
          }]);
        }, 500);
      });
    });

    // 获取医院列表
    mock.onPost(globalData.getHospitalList).reply(config => {
      console.log("globalData.getHospitalList")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: _HospitalList,
            errorCode: 0
          }]);
        }, 500);
      });
    });

    // 获取某医院的科室、楼号、楼层关系表
    mock.onPost(globalData.getDepartmentList).reply(config => {
      console.log("globalData.getDepartmentList")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: _Departments,
            errorCode: 0
          }]);
        }, 500);
      });
    });

    // 获取某医院外勤人员列表
    mock.onPost(globalData.getOutworkerList).reply(config => {
      console.log("globalData.getOutworkerList")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            data: _OutworkerList,
            errorCode: 0
          }]);
        }, 500);
      });
    });
    
  }
};