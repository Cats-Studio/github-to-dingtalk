const Actions = {
    push: require('./events/push')
}

module.exports = (headers, body) => {
    let event = headers['X-GitHub-Event'.toLowerCase()]
    let func = Actions[event]
    let res = func(headers, body)
    return res
}