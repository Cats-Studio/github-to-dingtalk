const Actions = {
    push: require('./actions/push'),
    issues: require('./actions/issues'),
}

module.exports = (headers, body) => {
    var event = headers['X-GitHub-Event'.toLowerCase()]
    var func = Actions[event]
    var res = func(headers, body)
    return res
}