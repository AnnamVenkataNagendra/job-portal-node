
import con from "../DbConnection/dbcon.js";
// Get All Jobs Avaliable
export const getAllJobs=()=>{
    return new Promise((reslove, reject)=>{
        con.query('select * from jobs',(err,result)=>{
            if(err){
                reject({
                    "query": "query fails!"
                })
            }
            reslove({
                "success":result
            })
        })
    })
}
// Get By Used ID:
export const jobSearch = (Id) => {
  return new Promise((resolve, reject) => {
    con.query(
      'SELECT * FROM jobs WHERE id = ?',
      [Id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length === 0) {
           reject("Invalid Job ID");
        }
        resolve(result[0]);
      }
    );
  });
};
// Update By ID:
export const updateJob = (
    id,
    recruiter_id,
    title,
    company_name,
    location,
    job_type,
    salary,
    description,
    requirements
) => {
    return new Promise((resolve, reject) => {
        if (
            !title ||
            !company_name ||
            !location ||
            !job_type ||
            salary == null ||
            !description ||
            !requirements
        ) {
             reject({
                message: "Please provide all required fields"
            });
        }
        con.query(
            `UPDATE jobs
             SET title = ?, company_name = ?, location = ?,
                 job_type = ?, salary = ?, description = ?, requirements = ?
             WHERE id = ? AND recruiter_id = ? AND status = 'open'`,
            [
                title,
                company_name,
                location,
                job_type,
                salary,
                description,
                requirements,
                id,
                recruiter_id
            ],
            (err, result) => {

                if (err) {
                    return reject({
                        message: "Unable to update job"
                    });
                }
                if (result.affectedRows === 0) {
                    return reject({
                        message: "Unable to update job"
                    });
                }
                return resolve({
                    message: "Job updated successfully",
                    affectedRows: result.affectedRows,
                    changedRows: result.changedRows
                });
            }
        );
    });
};

// Delete By ID:
export const deleteId=(id, recurited_Id)=>{
    return new Promise((reslove, reject)=>{
        con.query('DELETE FROM jobs WHERE id = ? AND recruiter_id = ?', [id, recurited_Id], (err, result)=>{
              console.log(err);
            console.log(err);
            if(err){
                reject({
                   message: "Unable to delete job"
                })
            }
             reslove({
                message:"deleted success",
                success:result
            })
        })
    })
}
