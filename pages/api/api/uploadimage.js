import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';

/* Don't miss that! */
export const config = {
    api: {
        bodyParser: false,
    }
};


const handler = async (req, res) => {

  
       let resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            resultBody.url= await saveFile(files.file);
            console.log(resultBody)
            res.status(201).json({resultBody});
        });

        const saveFile = async (file) => {
            
            /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/public/images/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

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