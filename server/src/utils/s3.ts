// npm istal aws -sdk
// npm install fs
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


function uploadFile(directoryName: string, fileName: string, file: any, isnew: boolean) {
  // send a file from frontend and download onto backend with multer and then take that 
  // and send to aws
  const directoryKey = `${directoryName}/`;
  const fileKey = `${directoryKey}${fileName}`;

  var dirresponse = null;
  if (isnew) {
    const directoryParams = {
      Bucket: bucketName,
      Key: directoryKey,
    };
    dirresponse = s3.putObject(directoryParams).promise();
  }

  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileKey
  }

  return s3.upload(uploadParams).promise();

}

function getFileStream(directoryName: string, fileName: string,) {
  // TAKES THE PICTURE NAME THAT'S ON S3 
  const directoryKey = `${directoryName}/`;
  const fileKey = `${directoryKey}${fileName}`;

  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  try {
    const res = s3.getObject(downloadParams);
    return res
  }
  catch (err) {
    console.log(`Error retrieving image!! ${fileKey}: ${err}`);
  }

}

function deleteImage(directoryName: string, fileName: string,) {
  const directoryKey = `${directoryName}/`;
  const fileKey = `${directoryKey}${fileName}`;

  const params = {
    Bucket: bucketName, // replace with your bucket name
    Key: fileKey, // the key of the image to delete
  };

  try {
    s3.deleteObject(params).promise();
  } catch (err) {
    console.log(`Error deleting image ${fileKey}: ${err}`);
  }
}

async function deleteDirectory(directoryName: string) {
  const directoryKey = `${directoryName}/`;
  try {

    const objects = await s3.listObjectsV2({
      Bucket: bucketName,
      Prefix: directoryKey,
    }).promise();

    // If the directory is empty, delete it and return
    if (!objects.Contents?.length) {
      await s3.deleteObject({
        Bucket: bucketName,
        Key: directoryKey,
      }).promise();
      return;
    }

    // Delete all objects within the directory
    await s3.deleteObjects({
      Bucket: bucketName,
      Delete: {
        // @ts-ignore
        Objects: objects.Contents!.map(({ Key }) => ({ Key })),
      },
    }).promise();


    // Delete the directory itself
    await s3.deleteObject({
      Bucket: bucketName,
      Key: directoryKey,
    }).promise();

  } catch (err) {
    console.log(`Error deleting directory ${directoryKey}: ${err}`);
  }

}

export default {
  uploadFile,
  getFileStream,
  deleteImage,
  deleteDirectory
};
