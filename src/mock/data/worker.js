import Mock from 'mockjs';

let listData = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 1,
      workerId: '@word(10)',
      createTime: '@date("yyyy-MM-dd HH:mm:ss")',
      name: '@cname()',
      'sex|+1': ['1', '2'],
      'sexName|+1': ['男', '女'],
      'age|18-80': 18,
      phone: /^1[34578]\d{9}$/,
      'workCount|0-100': 10,
      'workStatus|+1': ['1', '2', '3', '4'],
      'workStatusName|+1': ['在职工作', '在职待岗', '休假中', '已离职'],

      idCard: "1102221984832741",
      nativePlace: ["150000","150300","150304"],
      nativePlaceName: '@city(true)',
      'education|+1': ['1','2','3'],
      'educationName|+1': ["小学", "初中", "高中"],
      'serviceYears|+1': ['1','2','3'],
      'serviceYearsName|+1': ["三年以下", "3-5年", "5年以上"],
      haveIntermediaryAgreement: false,
      haveHealthCert: true,
      healthCert: "H12311",
      healthCertExpiryDate: "2018-09-09",
      accidentInsurance: false,
      'bank|+1': ['1','2','3'],
      'bankName|+1': ['中国建设银行','中国工商银行','中国银行'],
      bankCard: "685474372364",
      bankFullName: "阜成路支行",
      'hospital|+1': ['1','2','3'],
      'hospitalName|+1': ['顺义区医院','顺义区中医院','中日友好医院'],
      hireDate: "2018-08-09",
      leaveDate: "",
      expertDept: "儿科",
      skill: "推拿、针灸",
      avatarPhotoUrl: "",
      bankCardPhotoUrl: "",
      educationPhotoUrl: "",
      healthCertPhotoUrl: "",
      idCardPhotoUrl: [],
      equipments: [],
      equipmentNames: [],

      'canSelect|+1': [true, false],
      cannotSelectReason: '@cword(10, 50)'
    },
  ],
})

const workers = listData.data

export { workers };
