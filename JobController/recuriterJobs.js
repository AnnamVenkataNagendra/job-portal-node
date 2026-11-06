import con from "../DbConnection/dbcon.js";
export const recruiterDashboard = (recuriter_Id) => {
    return new Promise((resolve, reject) => {
        con.query(
            'SELECT COUNT(*) AS totalJobs FROM jobs WHERE recruiter_id = ?',
            [recuriter_Id],
            (err, numbers) => {

                if (err) {
                    return reject({
                        message: 'Unable to fetch recruiter jobs count'
                    });
                }
                con.query(
                    'SELECT * FROM jobs WHERE recruiter_id = ?',
                    [recuriter_Id],
                    (err, result) => {

                        if (err) {
                            return reject({
                                message: 'Unable to fetch jobs posted by recruiter'
                            });
                        }
                        resolve({
                            totalJobs: numbers[0].totalJobs,
                            jobs: result
                        });
                    }
                );
            }
        );
    });
};