const express = require('express')
const app = express()
const port = 9000

const SendMarkdown = require('./DingtalkBot')
const GetMessage = require('./GetMessage')
const respond = require('./SendResponse')

app.use(express.json())

app.post("/", (req, res, next) => {
    let headers = req.headers
    let body = req.body

    let msg
    try {
        msg = GetMessage(headers, body)
    } catch (error) {
        respond.Error(res, error)
        return;
    }

    SendMarkdown(msg.title, msg.text, res)
})

app.listen(port)