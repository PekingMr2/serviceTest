import Mock from 'mockjs';

let listData = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 1,
      createTime: '@date("yyyy-MM-dd HH:mm:ss")',
      orderId: '@word(10)',
      patientName: '@cname()',
      'sex|+1': ['1', '2'],
      'sexName|+1': ['男', '女'],
      phone: /^1[34578]\d{9}$/,
      contact: '@cname()',
      patientRemark: '@cword(10, 100)',
      patientId: '@word(10)',
      admissionTime: '@date("yyyy-MM-dd HH:mm:ss")',
      'hospital|+1': ['1','2','3'],
      'hospitalName|+1': ['顺义区医院','顺义区中医院','中日友好医院'],
      workerNames: '@cname()' + '、' + '@cname()',
      beginTime: '@date("yyyy-MM-dd HH:mm:ss")',
      endTime: '@date("yyyy-MM-dd HH:mm:ss")',
      'totalAmount|100-1000': 1000,
      'totalCost|100-1000': 1000,
      'orderStatus|+1': [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
      ],
      'orderStatusName|+1': [
        '待派单',
        '待服务',
        '服务中',
        '退款中',
        '已完成',
        '已取消'
      ],
      'payStatus|+1': [
        0, 1, 1, 2, 2, 0
      ],
      'payStatusName|+1': [
        "--", "待收款", "待收款", "已收款", "已收款", "--" 
      ],
      orderDetail: [{
        title: '订单xxx',	
        beginTime: '@date("yyyy-MM-dd HH:mm:ss")',
        endTime: '@date("yyyy-MM-dd HH:mm:ss")',
        'outworker|+1': [1, 2, 3],
        'outworkerName|+1': ["张三", "李四", "王五"],
        remark: "备注",
        'isRenewal|+1': [true, false], //是否是续费
        renewalAmount: 1000, // 续费应收款
        renewalActualAmount: 800, // 续费实收款
        receiptNumber: '123123123', //关联收据编号
        chargeInfo: {
          'diseaseGrade|+1': ["1", "2", "3", "4"],
          'diseaseGradeName|+1': ["A", "B", "C", "T"],
          day: 3,
          oneDayPrice: 230,
          halfDayPrice: 150,
          totalPrice: 1230,
          actualTotalPrice: 1200,
          actualDayPrice: 130,
        },
        sickRoomInfo: {
          'department|+1': ["1", "2", "3", "4"],
          'departmentName|+1': ["儿科", "外科", "内科", "妇产科"],
          'buildingNumber|+1': ["1", "2", "3", "4"],
          'buildingNumberName|+1': ["A座", "B座", "C座", "T座"],
          'floor|+1': ["1", "2", "3", "4"],
          'floorName|+1': ["一层", "二层", "三层", "四层"],
          bedNumber: '101',
          nurse: '张三',
          headNurse: '李四'
        },
        workerInfo: {
          'serviceType|+1': ["1", "2", "3", "4"],
          'serviceTypeName|+1': ["一对一", "二对一", "一对多", "多对多"],
        	workers: [{
        		workerId: '1',
        		workerName: '赵六',
            dayPay: 220,
            halfDayPay: 140,
        		totalPay: 1100
        	},{
        		workerId: '2',
        		workerName: '曹琪',
            dayPay: 220,
            halfDayPay: 140,
        		totalPay: 1100
        	}]
        },
      }],
      settlement:[{
        summary: "收款 订单总额",
        time: "2016-09-12",
        fundType: "1",
        fundTypeName: "现金",
        amount: 10000,
        remark: "备注1"
      },{
        summary: "退款",
        time: "2016-09-10",
        fundType: "2",
        fundTypeName: "POS机",
        amount: 980,
        remark: "备注2"
      }]
    },
  ],
})

const orders = listData.data

export { orders };
