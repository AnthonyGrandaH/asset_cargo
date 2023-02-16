const {Router} = require('express');
const pool = require('../db')
const { getAllCargo } = require('../controllers/controller')
const { getCargo } = require('../controllers/controller')
const { createCargo } = require('../controllers/controller')
const { deleteCargo } = require('../controllers/controller')
const { updateCargo } = require('../controllers/controller')

const router = Router();

router.get('/cargo', getAllCargo)

router.get('/cargo/:id', getCargo)

router.post('/cargo/', createCargo)

router.delete('/cargo/:id', deleteCargo)

router.put('/cargo/:id', updateCargo)

module.exports = router;



module.exports = router;