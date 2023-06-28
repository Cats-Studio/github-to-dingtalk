const request = require("request")
const crypto = require('crypto');
const querystring = require("querystring")

const respond = require("./SendResponse")
const config = require("./conf.json")

const url = config.url;
const secret = config.secret;

module.exports = function SendMarkdown(title, message, res) {
    if (url == null || secret == null
        || url.length == 0 || secret.length == 0) {
        respond.Error(res, {
            ErrorType: "config error",
            Message: "'url' or 'secret' is missing"
        })
        return;
    }

    // 使用加签进行安全验证
    // 官方文档：https://open.dingtalk.com/document/orgapp/customize-robot-security-settings

    let timestamp = Date.now()

    const signString = timestamp + "\n" + secret;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(signString, 'utf8');
    const signature = hmac.digest();
    const sign = Buffer.from(signature).toString('base64');

    let url_data = {
        timestamp: timestamp,
        sign: sign
    }
    let query_url = url + "&" + querystring.stringify(url_data)

    var msg = {
        msgtype: "markdown",
        markdown: {
            title: title,
            text: message
        }
    }

    let option = {
        url: query_url,
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