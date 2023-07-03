const Actions = {
    push: require('./actions/push'),
    issues: require('./actions/issues'),
}

module.exports = (headers, body) => {
    let event = headers['X-GitHub-Event'.toLowerCase()]
    let func = Actions[event]
    let res = func(headers, body)
    return res
}