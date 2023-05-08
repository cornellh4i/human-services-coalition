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
  console.log("DIRECTORY IS " + directoryKey)
  const fileKey = `${directoryKey}${fileName}`;
  console.log("FIleKey IS " + fileKey)

  console.log("Creating the directory")
  var dirresponse = null;
  if (isnew) {
    const directoryParams = {
      Bucket: bucketName,
      Key: directoryKey,
    };
    dirresponse = s3.putObject(directoryParams).promise();
  }
  console.log("Direc created successfully!")
  console.log(dirresponse)


  console.log("I WONDER IF I GOT THE FILE PATH!!!!!!!")
  console.log(file.path)

  const fileStream = fs.createReadStream(file.path)
  console.log("THE READ STREEM")
  console.log(fileStream)


  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileKey
  }

  console.log("Now testing upload")
  return s3.upload(uploadParams).promise();

}

function getFileStream(directoryName: string, fileName: string,) {
  // TAKES THE PICTURE NAME THAT'S ON S3 

  const directoryKey = `${directoryName}/`;
  console.log("DIRECTORY IS " + directoryKey)
  const fileKey = `${directoryKey}${fileName}`;
  console.log("FILEKEY IS " + fileKey)

  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  console.log("DOWNLOADING THE FILE")
  console.log(`DOWNLOAD PARAMS IS: ${downloadParams}`)
  try {
    const res = s3.getObject(downloadParams);
    console.log(`Successfully retrieved image ${fileKey}`);
    return res
  }
  catch (err) {
    console.log(`Error retrieving image!! ${fileKey}: ${err}`);
  }

}

function deleteImage(directoryName: string, fileName: string,) {
  const directoryKey = `${directoryName}/`;
  console.log("DIRECTORY IS " + directoryKey)
  const fileKey = `${directoryKey}${fileName}`;
  console.log("FIleKey IS " + fileKey)
  const params = {
    Bucket: bucketName, // replace with your bucket name
    Key: fileKey, // the key of the image to delete
  };

  try {
    s3.deleteObject(params).promise();

    console.log(`Successfully deleted image ${fileKey}`);
  } catch (err) {
    console.log(`Error deleting image ${fileKey}: ${err}`);
  }
}

async function deleteDirectory(directoryName: string) {
  const directoryKey = `${directoryName}/`;
  console.log("DIRECTORY IS Deletee" + directoryKey)
  const params = {
    Bucket: bucketName, // replace with your bucket name
    Key: directoryKey, // the key of the image to delete
  };
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
