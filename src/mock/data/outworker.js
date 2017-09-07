import Mock from 'mockjs';

let listData = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 1,
      name: '@cname()',
    },
  ],
})

const outworkerList = listData.data

export { outworkerList };
