const Actions = {
    push: require('./actions/push')
}

module.exports = (headers, body) => {
    let event = headers['X-GitHub-Event'.toLowerCase()]
    let func = Actions[event]
    let res = func(headers, body)
    return res
}