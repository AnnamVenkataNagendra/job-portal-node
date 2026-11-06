import con from "../DbConnection/dbcon.js";

export const getApplicantsForMyJobs =(recurited_id)=>{

    return new Promise((reslove, reject)=>{

        const sql = `
    SELECT
      a.id AS application_id,
      a.status AS application_status,
      a.resume_url,
      a.cover_letter,
      a.applied_at,
      j.id AS job_id,
      j.title AS job_title,
      j.company_name AS company_name,
      u.id AS candidate_id,
      u.name AS candidate_name,
      u.email AS candidate_email
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN users u ON a.candidate_id = u.id
    WHERE j.recruiter_id = ?`

        con.query(sql, [recurited_id],(err, result)=>{
             if (err) {
           reject({
               message: "Unable to fetch applicants"
                  });
              }
              reslove({
                count: result.length,
                applicants: result
              })
        })
    })
}