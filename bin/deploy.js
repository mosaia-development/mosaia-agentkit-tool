const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const lambda = new AWS.Lambda({ region: 'us-east-1' });

const { AWS_LAMNDA_FN_NAME, AWS_LAMBDA_FN_ROLE_ARN } = process.env;

const functionName = AWS_LAMNDA_FN_NAME;
const roleArn = AWS_LAMBDA_FN_ROLE_ARN;
const zipFilePath = path.join(__dirname, '../dist/lambda.zip');

async function deployLambda() {
  const zipFile = fs.readFileSync(zipFilePath);

  try {
    await lambda.getFunction({ FunctionName: functionName }).promise();

    // Update function if it exists
    await lambda.updateFunctionCode({
      FunctionName: functionName,
      ZipFile: zipFile,
    }).promise();

    console.log('Lambda updated.');
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {

      // Create function if it doesn’t exist
      await lambda.createFunction({
        FunctionName: functionName,
        Runtime: 'nodejs18.x',
        Role: roleArn,
        Handler: 'index.handler',
        Code: { ZipFile: zipFile },
        Timeout: 900
      }).promise();

      console.log('Lambda created.');
    } else {
      console.error('Deployment failed:', error);
    }
  }
}

deployLambda();
