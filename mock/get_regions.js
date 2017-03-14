const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/edu_rest/acquire_campus/:id',
  response: function (req, res) {
    res.json({
      rlt: 'true',
      msg: 'ok',
      data: [
        { campus_id: faker.random.uuid(), campus_name: faker.address.city() },
        { campus_id: faker.random.uuid(), campus_name: faker.address.city() },
        { campus_id: faker.random.uuid(), campus_name: faker.address.city() }
      ]
    })
  }
}
