//npm istal aws -sdk
//npm install fs
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = 'h4i-workshop'
const region = 'us-east-2'
const accessKeyId = 'AKIAS5JROXG2AX2L7RHS'
const secretAccessKey = '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'

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})


function uploadFile(file: any, name: string) {
  //send a file from frontend and download onto backend with multer and then take that 
  //and sed to aws

  //get file from server -- fs 
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: name
  }
  return s3.upload(uploadParams).promise()
}

export default uploadFile;
