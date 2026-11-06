
import con from "../DbConnection/dbcon.js";

export const fetchApplication = (application_Id) => {
    return new Promise((resolve, reject) => {

        con.query(
            `SELECT
                a.id AS application_id,
                a.job_id,
                a.status AS application_status,
                j.company_name,
                j.location,
                j.job_type 
              FROM applications a
             JOIN jobs j ON a.job_id = j.id
             WHERE a.candidate_id = ?`,
            [application_Id],
            (err, result) => {

                if (err) {
                    return reject({
                        message: "Unable to fetch data"
                    });
                }

                resolve({
                    count: result.length,
                    applicationData: result
                });
            }
        );
    });
};
