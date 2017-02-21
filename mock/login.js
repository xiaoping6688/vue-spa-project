const faker = require('faker')

module.exports = {
  api: '/mock/edu_rest/org_login',
  response: function (req, res) {
    res.json({
      rlt: 'true',
      msg: 'ok',
      data: faker.random.uuid()
    })
  }
}
