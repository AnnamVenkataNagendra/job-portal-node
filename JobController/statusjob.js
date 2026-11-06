import con from "../DbConnection/dbcon.js";
export const updateApplicationStatus = (Id, status, login_Id) => {
  return new Promise((resolve, reject) => {
    const allowedStatuses = [
      "Applied",
      "Under Review",
      "Shortlisted",
      "Rejected",
      "Selected"
    ];
    if (!status || !allowedStatuses.includes(status)) {
      return reject({
        message: "Please provide a valid application status"
      });
    }
    const sql = `
      UPDATE applications a
      JOIN jobs j ON a.job_id = j.id
      SET a.status = ?
      WHERE a.id = ? AND j.recruiter_id = ?
    `;
    con.query(sql, [status, Id, login_Id], (err, result) => {
      if (err) {
        console.log("SQL Error:", err);
        return reject({
          message: "Unable to update application status"
        });
      }

      if (result.affectedRows === 0) {
        return reject({
          message: "Application not found or you are not authorized"
        });
      }

      resolve({
        message: "Application status updated successfully",
        status: status
      });

    });
  });
};
