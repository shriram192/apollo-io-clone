const express = require('express');
const router = express.Router();
const search = require('./search')
const tag = require('./tag')

router.get('/', (req, res) => {
  res.json({
    message: 'API - Search',
  });
});

router.use('/search',search)
router.use('/tag',tag)


module.exports = router;
