const db = require('./banco')

const Agendamento = db.sequelize.define('agendamentos', {
  nome: {
    type: db.Sequelize.STRING
  },
  telefone: {
    type: db.Sequelize.STRING
  },
  origem: {
    type: db.Sequelize.STRING
  },
  data_contato: {
    type: db.Sequelize.DATE
  },
  observacao: {
    type: db.Sequelize.TEXT
  }
})

//Agendamento.sync({force: true})

module.exports = Agendamento
