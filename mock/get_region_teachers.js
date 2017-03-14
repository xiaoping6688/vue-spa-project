const faker = require('faker')
faker.locale = 'zh_CN'

module.exports = {
  api: '/mock/edu_rest/acquire_teacher_by_org/:id',
  response: function (req, res) {
    res.json({
      rlt: 'true',
      msg: 'ok',
      data: [
        { teacher_id: faker.random.uuid(), teacher_name: faker.name.findName(), mobile:faker.phone.phoneNumber(), role_name:faker.name.jobType(), subject_name:faker.name.jobTitle(), campus_name:faker.random.words() },
        { teacher_id: faker.random.uuid(), teacher_name: faker.name.findName(), mobile:faker.phone.phoneNumber(), role_name:faker.name.jobType(), subject_name:faker.name.jobTitle(), campus_name:faker.random.words() },
        { teacher_id: faker.random.uuid(), teacher_name: faker.name.findName(), mobile:faker.phone.phoneNumber(), role_name:faker.name.jobType(), subject_name:faker.name.jobTitle(), campus_name:faker.random.words() }
      ]
    })
  }
}
