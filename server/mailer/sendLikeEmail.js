const { mailjet } = require('../config/mailerConfig');
const User = require('./../rest/components(C-M-R)/user/model');
const user = new User();

const sendLikeEmail = async (likedUserId, likingUserId) => {
  const [{ firstname, email }] = await user.getByFiltered('id', likedUserId, [
    'firstname',
    'email',
  ]);
  const [{ username: likingUser }] = await user.getByFiltered(
    'id',
    likingUserId,
    ['username'],
  );
  console.log(firstname, email, likingUser)
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
				"From": {
					"Email": "yann.petitjean06@gmail.com",
					"Name": "Matcha"
				},
				"To": [
					{
						"Email": email,
						"Name": firstname
					}
				],
				"TemplateID": 1197417,
				"TemplateLanguage": true,
				"Subject": "Someone likes you on Matcha 🔥",
				"Variables": {
      "firstname": firstname,
      "likinguser": likingUser,
    }
			}
    ],
  });

  await request.catch(err => {
    console.log(err);
  });
};

module.exports.sendLikeEmail = sendLikeEmail;
