module.exports.Success = (res) => {
    res.send("Success");
}

module.exports.Error = (res, errorMessage) => {
    res.status(500)
    res.send({
        ErrorMessage: errorMessage
    })
}