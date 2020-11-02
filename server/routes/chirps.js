const express = require('express');
const chirpStore = require('../chirpstore');
let router = express.Router();

router.get('/:id?', (req, res) => {
  const id = req.params.id;
  if (id) {
    res.json(chirpStore.GetChirp(id));
  } else {
    res.send(chirpStore.GetChirps());
  }
});

router.post('/', (req, res) => {
  chirpStore.CreateChirp(req.body);
  res.sendStatus(200);
});

router.put('/', (req, res) => {
  let tempChirp = {};
  tempChirp['name'] = req.body.name;
  tempChirp['text'] = req.body.text;
  chirpStore.UpdateChirp(req.body.id, tempChirp);
  res.sendStatus(200);
});

router.delete('/', (req, res) => {
  chirpStore.DeleteChirp(req.body.id);
  res.sendStatus(200);
});

module.exports = router;
