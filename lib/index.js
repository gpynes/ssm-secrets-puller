const extractNameAndValueForEachParam = params => params.map(param => ({
    Name: param.Parameter.Name.split('/').slice(-1)[0],
    Value: param.Parameter.Value
}))

const writeEachParamToSecretsFile = (secrectsFile) => params => {
    params.map(param => {
        const secret = `${param.Name}=${param.Value}\n`
        secrectsFile.write(secret)
    })
    return params
}

const fetchParams = (ssm) => (params) =>
    Promise.all(params.map(param =>
        ssm.getParameter({
            Name: param.Name,
            WithDecryption: true
        }).promise()
    ))

module.exports = {
    extractNameAndValueForEachParam,
    writeEachParamToSecretsFile,
    fetchParams,
}