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

    let status = 201,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
          await saveFile(files.file);
         
        });

        const saveFile = async (file) => {
            /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
       
            const tempPath = file.filepath;
            await fs.copyFile(tempPath, targetPath + file.originalFilename);
        
          };

    res.status(201).json({resultBody});
}

export default handler;