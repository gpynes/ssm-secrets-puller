const { SSM, config } = require('aws-sdk')
const { createWriteStream } = require('fs')
const { extractNameAndValueForEachParam, writeEachParamToSecretsFile, fetchParams } = require('./lib')

// ENV VARS
const MAX_RESULTS = process.env.MAX_RESULTS || 50
const FILTER_NAME_VALUES = process.env.SSM_FILTER_NAME_VALUES || ''
const SECRETS_FILE_PATH = process.env.SECRETS_FILE_PATH || process.cwd() + '/.env.secrets'
const AWS_REGION = process.env.AWS_REGION || 'us-west-2'

config.update({ region: AWS_REGION })

const secrectsFile = createWriteStream(SECRETS_FILE_PATH)
const ssm = new SSM()

const Values = FILTER_NAME_VALUES.split(',')
const Filters = (Values.length && Values[0].length) // Values must have a length and it's first value must have a length
    ? [{ Key: 'Name', Values }]
    : undefined

ssm.describeParameters({
    MaxResults: MAX_RESULTS,
    Filters
}).promise()
    .then(response => response.Parameters)
    .then(fetchParams(ssm))
    .then(extractNameAndValueForEachParam)
    .then(writeEachParamToSecretsFile(secrectsFile))
    .catch(err => console.log('ERROR RETRIEVING PARAMETERS', err))
