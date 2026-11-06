import con from "../DbConnection/dbcon.js";
export const jobPost=(req, res)=>{
      const {
        title,
        company_name,
        location,
        job_type,
        salary,
        description,
        requirements
    } = req.body;

      if (!title || !company_name || !location || !description) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }
     if (req.user.userRole !== "recruiter") {
        return res.status(403).json({
            message: "Only recruiters can post jobs"
        });
    }
        con.query('insert into jobs(recruiter_id, title, company_name, location, job_type, salary, description, requirements) values(?,?,?,?,?,?,?,?)',[req.user.id, title, company_name, location, job_type, salary, description, requirements],(err, result)=>{
             if (err) {
            console.error("Create job error:", err.message);
            return res.status(500).json({
                message: "Unable to create job"
            });
        }
        return res.status(201).json({
            message: "Job created successfully",
            jobId: result.insertId
        });
        })
}