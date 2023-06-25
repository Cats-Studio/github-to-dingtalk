module.exports = (headers, body) => {
    let repo = body['repository']
    let text = "";

    let repo_name = repo['name']
    let repo_branch = body['ref'].substring("refs/heads/".length)
    let repo_url = "https://github.com/" + repo['full_name']

    let commits = body['commits']
    let commits_cnt = commits['length']

    text += `[\[${repo_name}:${repo_branch}\]](${repo_url})` // [\[reponame:branch\]](url)
    text += ` ${commits_cnt.toString()} new commit` // 1 new commit
    if (commits_cnt != 1) {
        text += "s"
    }
    text += "\n"

    for (const commit of commits) {
        text += "> "

        let commit_id = commit['id']
        let commit_id_short = commit_id.substring(0, 7)
        let commit_url = commit['url']
        let commit_message = commit['message']
        let author = commit['author']['name']

        text += `[${commit_id_short}](${commit_url}) ${commit_message} - ${author}\n`
    }

    return {
        title: "push",
        text: text
    }
}