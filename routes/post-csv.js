import express from 'express';
import axios from 'axios';


const router = express.Router()


router.get('/', function(req, res){
    res.status(200).json({
        message: "API works"
    })
})


router.post('/add-csv', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let csv = req.files.csv;
            let config = {
                url: 'https://feed.totaljobs.com/partner/files/',
                method: 'post',
                data: csv,
                auth: {
                    username: process.env.USERNAME,
                    password: process.env.PASSWORD
                }
            }
            axios(config)
            .then((res)=>{
                res.status(200).json({
                    message: "File uploaded successfully"
                })
            }).catch((error)=>{
                res.status(error.response.status).json({
                    error: error.message,
                })
            })
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            csv.mv('./csv/' + csv.name);
            axios
            //send response
            // res.send({
            //     status: true,
            //     message: 'File is uploaded',
            //     data: {
            //         name: csv.name,
            //         mimetype: csv.mimetype,
            //         size: csv.size
            //     }
            // });
            
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;