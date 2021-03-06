const models = require('../models');

module.exports = {
  getAs:(req,res) => {
    let page = req.query.page || 0;
    let count = req.query.count || 5;
    let questionId = req.query.question_id;
    let input = {question_id: questionId, page: page, count: count};
    models.answers.getA(input)
    .then(response => {
      let result = {...input, results: response.rows};
      res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err))
  },

  addNew:(req,res) => {
    let data = req.body;
    data.question_id = req.query.question_id;
    models.answers.addA(data)
    .then(response => {
      res.status(205).send('CREATED');
    })
    .catch(err => res.status(500).send(err))
  },

  markHelpful:(req,res) => {
    models.answers.markH(req.params.question_id)
    .then(response => {
      res.status(204).send(response.command);
    })
    .catch(err => res.status(404).send(err))
  },

  report:(req,res) => {
    models.answers.report(req.params.question_id)
    .then(response => {
      res.status(204).send(response.command);
    })
    .catch(err => res.status(404).send(err))
  }
}