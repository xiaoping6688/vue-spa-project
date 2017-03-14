const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/edu_rest/acquire_role/:id',
  response: function (req, res) {
    res.json({
      rlt: 'true',
      msg: 'ok',
      data: [
        { role_id: faker.random.uuid(), role_name: faker.random.words() },
        { role_id: faker.random.uuid(), role_name: faker.random.words() },
        { role_id: faker.random.uuid(), role_name: faker.random.words() }
      ]
    })
  }
}
