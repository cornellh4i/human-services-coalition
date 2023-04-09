//npm istal aws -sdk
//npm install fs
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = 'h4i-workshop'
const region = 'us-east-2'
const accessKeyId = ''
const secretAccessKey = ''

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})


function uploadFile(file: any, name: string) {
  //send a file from frontend and download onto backend with multer and then take that 
  //and sed to aws

  console.log("uploading file")
  //get file from server -- fs 
  const fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: name
  }
  return s3.upload(uploadParams).promise()
}

function getFileStream(fileKey: any) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
}

export default {
  uploadFile,
  getFileStream
};
