const request = require("request")
const respond = require("./SendResponse")
const config = require("./conf.json")

const url = config.url;
const secret = config.secret;

// 暂时没有使用加签进行安全验证

module.exports = function SendMarkdown(title, message, res) {
    if (url == null || secret == null
        || url.length == 0 || secret.length == 0) {
        respond.Error(res, {
            ErrorType: "config error",
            Message: "'url' or 'secret' is missing"
        })
        return;
    }

    var msg = {
        msgtype: "markdown",
        markdown: {
            title: title,
            text: message
        }
    }

    let option = {
        url: url,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg)
    }

    request.post(option, (error, response, body) => {
        if (error) {
            respond.Error(res, {
                ErrorType: "post error",
                Message: error
            })
            return;
        }
        if (response.statusCode != 200) {
            respond.Error(res, {
                ErrorType: "post error",
                Message: `status: ${response.statusCode}`
            })
            return;
        }
        let resData = JSON.parse(body)
        if (resData.errcode != 0) {
            respond.Error(res, {
                ErrorType: "dingtalk bot error",
                Message: resData
            })
            return;
        }
        respond.Success(res);
        return;
    })
}