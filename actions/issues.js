module.exports = (headers, body) => {
    let repo = body['repository']
    let text = "";

    let repo_name = repo['name']
    let repo_branch = body['ref'].substring("refs/heads/".length)
    let repo_url = "https://github.com/" + repo['full_name']

    let issue = body["issue"]

    text += `[\[${repo_name}:${repo_branch}\]](${repo_url})` // [\[reponame:branch\]](url)
    text += "# 新问题:" // 1 new issue
    text += "\n"
    text += (">" + issue["body"])
    return {
        title: "issue",
        text: text
    }
}