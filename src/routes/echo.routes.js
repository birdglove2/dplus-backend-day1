const express = require('express');

const router = express.Router();

router.get('/echo_get', (req, res) => {
  res.status(200).json({ message: 'Echoooooo' });
});

router.get('/echo_qs', async (req, res) => {
  res.status(200).json({ title: req.query.title, page: req.query.page });
});

router.get('/echo_params/:params', async (req, res) => {
  res.status(200).json({ params: req.params.params });
});

router.post('/echo_post', async (req, res) => {
  res.status(200).json({ id: req.body.id, name: req.body.name });
});

module.exports = router;
