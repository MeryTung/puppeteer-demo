const express = require('express');

const home = require('./home')
const start = require('./start')
const checkList = require('./checklist')

const app =express();
app.get('/pins', async function (req, res) {
    const pins = await start()
    res.send(pins)
  })
  
app.get('/home', async function (req, res) {
    const homeStatus = await home().catch(err => {
      res.send(err)
    })
    res.send(homeStatus)
  })
  app.get('/checklist', async function (req, res) {
    const checklistStatus = await checkList().catch(err => {
      res.send(err)
    })
    res.send(checklistStatus)
  })
  app.listen(3000)
  