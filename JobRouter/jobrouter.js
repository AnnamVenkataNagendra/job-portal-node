import express from 'express'

import { jobPost } from "../JobController/createJobs.js";
import { verifyToken } from '../Middleware/authMiddleware.js';
import { deleteId, getAllJobs, jobSearch, updateJob } from '../JobController/getJobs.js';
import { getApplicantsForMyJobs } from '../JobController/updatejob.js';
import { updateApplicationStatus } from '../JobController/statusjob.js';
import { recruiterDashboard } from '../JobController/recuriterJobs.js';
const job_Router=express.Router()

// Job Post
job_Router.post('/jobs',verifyToken, jobPost)
// Get Jobs
job_Router.get("/fetch",(req, res)=>{
    getAllJobs()
    .then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(401).json(err);
    })
})
// Get By Id:
job_Router.get("/fetch/:Id",(req, res)=>{
    jobSearch(req.params.Id)
    .then((result)=>{
        res.status(200).json({
            "Query": result
        })
    }).catch((err)=>{
         res.status(500).json({
            "Error": "Query Error"
         })
    })
})
// Update By:Id
job_Router.put("/update/:Id",verifyToken,(req, res)=>{
    console.log("Logged-in user:", req.user);
    updateJob(
        req.params.Id,
        req.user.id,
        req.body.title,
        req.body.company_name,
        req.body.location,
        req.body.job_type,
        req.body.salary,
        req.body.description,
        req.body.requirements).then((result)=>{
        res.status(201).json(result)
    }).catch((err)=>{
        res.status(401).json(err)
    })
})

// Delete By ID:
job_Router.delete("/delete/:Id", verifyToken,(req, res)=>{
    if(req.user.userRole !== 'recruiter'){
        res.status(403).json({
         message: "Only recruiters can delete jobs"
        })
    }
    deleteId(
        req.params.Id,
        req.user.id
    ).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(401).json(err)
    })

})

job_Router.get("/retrive", verifyToken,(req,res)=>{
       if (req.user.userRole !== "recruiter") {
           return res.status(403).json({
           message: "Only recruiters can view applicants"
          });
         }
         getApplicantsForMyJobs(req.user.id)
         .then((result)=>{
            res.status(200).json(result)
         }).catch((err)=>{
            res.status(401).json(err)
         })
})

job_Router.put('/status/:Id',verifyToken,(req, res)=>{
      if (req.user.userRole !== "recruiter") {
    return res.status(403).json({
      message: "Only recruiter can update their applications"
    });
  }
   updateApplicationStatus(
    req.params.Id,
    req.body.status,
    req.user.id,
   ).then((result)=>{
            res.status(200).json(result)
         }).catch((err)=>{
            res.status(401).json(err)
         })

})
job_Router.get('/dashboard',verifyToken, (req,res)=>{
    if(req.user.userRole!='recruiter'){
    res.status(403).json({
          message: "Only recruiters can access this dashboard"
    })
    }
    recruiterDashboard(req.user.id)
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(403).json(err)
    })

})
export default job_Router;