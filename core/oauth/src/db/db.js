const Sequelize = require('sequelize')
const sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})