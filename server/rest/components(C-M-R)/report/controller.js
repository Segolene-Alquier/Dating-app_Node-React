const Report = require('./model');
const User = require('../user/model');

const reports = new Report();
const user = new User();

async function reportUserId(request, response) {
  const reportingUser = request.decoded.userid;
  const reportedUser = parseInt(request.params.id, 10);
  if (reportedUser === reportingUser) {
    return response
      .status(200)
      .json({ success: false, error: 'You can not report yourself!' });
  }
  try {
    const alreadyReported = await reports.exists(reportingUser, reportedUser);
    let query;
    if (alreadyReported) {
      return response
        .status(200)
        .json({ created: false, message: 'You already reported this User' });
    }
    query = await reports.create(reportingUser, reportedUser);
    if (parseInt(query.nbOfReports, 10) >= 2) {
      user.updateById(reportedUser, { suspended: true });
    }
    return response.status(200).json(query);
  } catch (err) {
    if (process.env.VERBOSE === 'true') console.log(err);
    response.status(206).send(err);
  }
}

module.exports.reportUserId = reportUserId;
