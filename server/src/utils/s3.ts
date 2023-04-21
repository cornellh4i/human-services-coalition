//npm istal aws -sdk
//npm install fs
require("dotenv").config(({ path: "config.env" }));
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.NAME
const region = process.env.REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

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
  //console.log("READING THE FILE STREAM ")
  //console.log(fileStream)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: name
  }
  return s3.upload(uploadParams).promise()
}

function getFileStream(fileKey: any) {//TAKES THE PICTURE NAME THAT'S ON S3 
  //WANT TO TELL THE FRONT END THAT i WANT THE CORNELL) PICTURE
  //IF UPLOAD IS SUCCESSFULL 
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  s3.region = region
  console.log("BEFOREEE")
  // const res = s3.getObject(downloadParams).createReadStream()
  const res = s3.getObject(downloadParams)
  console.log("OBBBAFGG[POOOOO")
  //console.log(res)
  return res

}

export default {
  uploadFile,
  getFileStream
};
