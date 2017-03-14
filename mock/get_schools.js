const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/edu_rest/acquire_school/:id',
  response: function (req, res) {
    res.json({
      rlt: 'true',
      msg: 'ok',
      data: [
        { school_id: faker.random.uuid(), school_name: faker.address.streetName() },
        { school_id: faker.random.uuid(), school_name: faker.address.streetName() },
        { school_id: faker.random.uuid(), school_name: faker.address.streetName() }
      ]
    })
  }
}
