
import formidable, { File } from 'formidable';
import AWS from 'aws-sdk'
import fs from 'fs'; 
/* Don't miss that! */
import {uploadImage} from 'components/system/firebaseActions';
export const config = {
    api: {
      bodyParser: false
    },
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
       let resultBody = { status: 'ok', message: 'Files were uploaded successfully' };
      
        const form = new formidable.IncomingForm();
       /* form.uploadDir = "./";
        form.keepExtensions = true;*/
        form.parse(req, async function (err, fields, files) {
      
            resultBody.url= await saveFile2(files.file);
           
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
            await fs.copyFile(tempPath, targetPath + file.originalFilename);
            return `/images/${file.originalFilename}`;
        } catch (e) {
           return '/images/no-image.png';
        }
          };

      
    
}

export default handler;