//npm istal aws -sdk
//npm install fs
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

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
