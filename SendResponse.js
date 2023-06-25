module.exports.Success = (res) => {
    res.send("Success");
}

module.exports.Error = (res, errorMessage) => {
    res.send({
        ErrorMessage: errorMessage
    })
}