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
      console.log(err, 'in model Report.create()');
      return { created: false, error: err };
    }
  }

  async exists(reportingUser, reportedUser) {
    try {
      console.log(
        `SELECT exists(SELECT from public."Report" WHERE "reportingUser" = ${reportingUser} AND "reportedUser" = ${reportedUser})`,
      );
      const result = await db.any(
        `SELECT exists(SELECT from public."Report" WHERE "reportingUser" = $1 AND "reportedUser" = $2);`,
        [reportingUser, reportedUser],
      );
      return result[0].exists;
    } catch (err) {
      console.log(err, 'in model Report.exists()');
      return null;
    }
  }

  // async isBanned(userId) {
  //   try {
  //     console.log(
  //       `SELECT exists(SELECT from public."Report" WHERE "reportingUser" = ${reportingUser} AND "reportedUser" = ${reportedUser})`,
  //     );
  //     const result = await db.any(
  //       `SELECT exists(SELECT from public."Report" WHERE "reportingUser" = $1 AND "reportedUser" = $2);`,
  //       [reportingUser, reportedUser],
  //     );
  //     return result[0].exists;
  //   } catch (err) {
  //     console.log(err, 'in model Report.exists()');
  //     return null;
  //   }
  // }

  // async delete(reportingUser, reportedUser) {
  //   try {
  //     console.log(
  //       `DELETE FROM public."Report" WHERE "reportingUser" = ${reportingUser} AND "reportedUser" = ${reportedUser}`,
  //     );
  //     const result = await db.any(
  //       'DELETE FROM public."Report" WHERE "reportingUser" = $1  AND "reportedUser" = $2 ',
  //       [reportingUser, reportedUser],
  //     );
  //     return { success: true, deleted: true };
  //   } catch (err) {
  //     console.log(err, 'in model User.delete()');
  //     return { deleted: false, error: err };
  //   }
  // }
}

module.exports = Report;
