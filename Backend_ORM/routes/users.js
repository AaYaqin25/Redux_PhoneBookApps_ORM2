var express = require('express');
var router = express.Router();
var models = require('../models/index.js')
var { Response } = require('../helpers/util.js');
const { Op } = require('sequelize');


router.get('/', async function (req, res, next) {
  try {
    const { name, phone } = req.query

    const page = parseInt(req.query.page) || 1
    const limit = 3
    const offset = (page - 1) * limit


    if (name && phone) {
      const { count, rows } = await models.User.findAndCountAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.iLike]: '%' + name + '%'
              }
            },
            {
              phone: {
                [Op.iLike]: '%' + phone + '%'
              }
            }
          ]
        },
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else if (name) {
      const { count, rows } = await models.User.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: '%' + name + '%'
          }
        },
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else if (phone) {
      const { count, rows } = await models.User.findAndCountAll({
        where: {
          phone: {
            [Op.iLike]: '%' + phone + '%'
          }
        },
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    } else {
      const { count, rows } = await models.User.findAndCountAll({
        order: [
          ["id", "ASC"]
        ],
        limit: limit,
        offset: offset
      })
      const totalPage = Math.ceil(count / limit)
      res.json(new Response({ result: rows, page: page, totalPage: totalPage, offset }))
    }
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

router.post('/', async function (req, res, next) {
  try {
    const addUser = await models.User.create(req.body)
    res.json(new Response(addUser))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const updateUser = await models.User.update(req.body,
      {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      })
    res.json(new Response(updateUser[1]))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const deleteUser = await models.User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(new Response(deleteUser))
  } catch (error) {
    res.status(500).json(new Response(error, false))
  }
});

module.exports = router;

