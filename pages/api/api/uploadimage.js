
import formidable, { File } from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs'; 
import { app, db, stograge } from 'components/system/firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL,uploadBytes } from "firebase/storage";
/* Don't miss that! */
import {uploadImage} from 'components/system/firebaseActions';
import path from 'path';
import { async } from '@firebase/util';
export const config = {
    api: {
      bodyParser: false
    },
  }
  
  const uploadImage1 = async (file,blob) => {

    // Create a root reference

   
   // const storageRef = ref(stograge,file);

    // Upload the file and metadata
  /*
    const uploadTask = await uploadBytesResumable(mountainImagesRef, blob);
*/
}
const fileupp = async (file) => { 

  const blob = fs.readFileSync(file.filepath);


       

          // Create a reference to 'mountains.jpg'
          //const mountainsRef = ref(storage, file);
          
          // Create a reference to 'images/mountains.jpg'
          const mountainImagesRef = ref(stograge, `/images/${file.originalFilename}`);
          
          // While the file names are the same, the references point to different files
          //mountainsRef.name === mountainImagesRef.name;           // true  
             
          var url1 = "";
          // 'file' comes from the Blob or File API
  var uploadTask = await uploadBytes(mountainImagesRef, blob);
 const url =await  getDownloadURL(uploadTask.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
   url1 = downloadURL;
  // console.log(url);
   
  });
  console.log( url);
  return url1;
    // Upload completed successfully, now we can get the download URL

        
        
}
const handler = async (req, res) => {

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID1,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY1,
  })

  const uploadedImage =async(file)=>{ 
    const blob = fs.readFileSync(file.filepath);
    const res = await s3.upload({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalFilename,
    Body: blob,
  }).promise()

  return res.Location;
  }
  
  const uploadData = async (file) => {
    uploadImage(file);
}

       let resultBody = { status: 'ok', message: 'Files were uploaded successfully' };
      
        const form = new formidable.IncomingForm();
       /* form.uploadDir = "./";
        form.keepExtensions = true;*/
        form.parse(req, async function (err, fields, files) {
      
            resultBody.url= await saveFile(files.file);
           
            res.status(201).json({resultBody});
        });

        const saveFile2 = async (file) => {
          
         return await uploadedImage(file)
        }
/*   
        const saveFile1 = async (file) => {
            const data = fs.readFileSync(file.filepath);
            fs.writeFileSync(`./public/images/${file.originalFilename}`, data);
            await fs.unlinkSync(file.filepath);
            return `/images/${file.originalFilename}`;
           
          };*/

        const saveFile = async (file) => {
            
          /* Create directory for uploads */
         
        const targetPath = path.join(process.cwd(), `/public/images/`);
       /* try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }*/
          
        /* Move uploaded files to directory */
        try{
            const tempPath = file.filepath;
          fs.copyFile(tempPath, targetPath + file.originalFilename, async function () { 

          });
          

          return await fileupp(file);
          //uploadData(file,blob);
         
           
        } catch (e) {
          console.log(e);
           return '/images/no-image.png';
        }
          
        
        };

      
    
}

export default handler;