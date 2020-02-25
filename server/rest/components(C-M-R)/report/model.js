const { db } = require('../../../config/database');

class Report {
  isValidType(type) {
    const authorizedTypes = ['id', 'reportingUser', 'reportedUser'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async create(reportingUserId, reportedUserId) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `INSERT INTO public."Report" (reportingUser, reportedUser) VALUES (${reportingUserId}, ${reportedUserId} RETURNING id)`,
        );
      return await db
        .any(
          'INSERT INTO public."Report" ("reportingUser", "reportedUser") VALUES ($1, $2) RETURNING id, (SELECT COUNT(*) as nbofreports FROM Public."Report" WHERE "reportedUser" = $2)',
          [reportingUserId, reportedUserId],
        )
        .then(data => {
          return {
            success: true,
            created: true,
            id: data[0].id,
            nbOfReports: data[0].nbofreports,
          };
        });
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Report.create()');
      return { created: false, error: err };
    }
  }

  async exists(reportingUser, reportedUser) {
    try {
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT exists(SELECT from public."Report" WHERE "reportingUser" = ${reportingUser} AND "reportedUser" = ${reportedUser})`,
        );
      const result = await db.any(
        `SELECT exists(SELECT from public."Report" WHERE "reportingUser" = $1 AND "reportedUser" = $2);`,
        [reportingUser, reportedUser],
      );
      return result[0].exists;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Report.exists()');
      return null;
    }
  }
}

module.exports = Report;
