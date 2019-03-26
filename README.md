# SSM PARAMETER PULLER
This is a simple helper function written in node to pull in parameters from AWS Prameter Store and add them to a file.

# Table of Contents
- [SSM PARAMETER PULLER](#ssm-parameter-puller)
- [Table of Contents](#table-of-contents)
- [How it works](#how-it-works)
- [Packaging](#packaging)


# How it works
There are 4 env variables you can set for configuration:
- `SSM_FILTER_NAME_VALUES`: this is a comma delimited list of names to filter by in the query - Defaults to `''`
- `MAX_RESULTS`: this maps to the [MaxResult](https://docs.aws.amazon.com/systems-manager/latest/APIReference/API_DescribeParameters.html) parameter of the `DescribeParameters` method in the `aws-sdk` - Defaults to `50`
- `SECRETS_FILE_PATH`: path to file, relative to invocation, where the parameters should be stored - Defaults to `.env.secrets`
- `AWS_REGION`: aws-region - Defaults to `us-west-2`

**Please note:** this package relies heavily on the `aws-sdk`, please see these [instructions](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html) for authenticating (`AWS_PROFILE` is the recommended way).


# Packaging
This package has the ability to build itself as a binary file that can be run on any environment. For more information see this [pkg](https://www.npmjs.com/package/pkg)

To compile it simply run `npm run package` - this will build for all platforms (`linux`, `mac` and `windows`). The binaries will be build with whatever `node version` and whatever `x-bit Operating System` your computer is running at the time of compile.

The binaries will be built in the `dist` directory which you can then move around wherever you want them to be used.