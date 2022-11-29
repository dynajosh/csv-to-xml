import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import candidateRouter from './routes/post-csv.js';

dotenv.config();


const app = express()
const PORT =  process.env.PORT || 6000;
const corsOptions = {credentials:true, origin:process.env.ALLOWED_URL || '*'}


app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(json())
app.use(fileUpload({
    createParentPath: true
}));
app.use('/candidates', candidateRouter)



app.get('/', (req, res)=>{
    res.status(200).json({
        message: "App is running"
    })
})

app.listen(PORT, ()=>{console.log(`Server is runign on port ${PORT}`)})
