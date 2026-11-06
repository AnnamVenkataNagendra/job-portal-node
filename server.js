import express from 'express';
import router from './Router/router.js';
import dotenv from 'dotenv';
import  cors from 'cors'
import job_Router from './JobRouter/jobrouter.js';
import job_Applied from './RouterApplication/jobapplication.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/register/api",router);
app.use("/jobs/api",job_Router);
app.use("/apply/api",job_Applied)

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});