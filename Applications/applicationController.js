
import con from "../DbConnection/dbcon.js";

export const appliedJobs = (job_id, candidate_id, resume_url, cover_letter) => {
    return new Promise((resolve, reject) => {

        if (!job_id || !candidate_id || !resume_url || !cover_letter) {
            return reject({
                message: "All fields are required"
            });
        }

        const sql = `
            INSERT INTO applications
            (job_Id, candidate_id, resume_url, cover_letter)
            VALUES (?, ?, ?, ?)
        `;

        con.query(sql, [job_id, candidate_id, resume_url, cover_letter], (err, result) => {
            if (err) {
                if (err.code === 1061) {
                    return reject({
                        "message": "You have already applied for this job"
                    });
                }

                return reject({
                    "message": "Unable to insert application",
                    "error": err.message
                });
            }

            return resolve({
                "message": "Application submitted successfully",
                "applicationId": result.insertId
            });
        });
    });
};
