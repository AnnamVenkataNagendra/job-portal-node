
import express from 'express'
import { verifyToken } from '../Middleware/authmiddleware.js';
import { appliedJobs } from '../Applications/applicationController.js';
import { fetchApplication } from '../Applications/getapplication.js';

const job_Applied=express.Router();

job_Applied.post("/jobpost", verifyToken, (req, res) => {
    if (req.user.userRole !== "candidate") {
         res.status(403).json({
            "message": "Only candidates can apply for jobs"
        });
    }
    appliedJobs(
        req.body.job_id,
        req.user.id,
        req.body.resume_url,
        req.body.cover_letter
    )
    .then((result) => {
         res.status(201).json(result);
    })
    .catch((err) => {
         res.status(400).json(err);
    });
});

job_Applied.get("/fetch", verifyToken, (req, res)=>{
if (req.user.userRole !== "candidate") {
  return res.status(403).json({
    message: "Only candidates can view their applications"
  });
}
fetchApplication(req.user.id)
.then((result)=>{
    res.status(200).json(result)
}).catch((err)=>{
    res.status(401).json(err);
})
})
export default job_Applied;