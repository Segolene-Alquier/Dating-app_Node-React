const { mailjet } = require('../config/mailerConfig');

const sendForgotPasswordEmail = async (email, firstname, token) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'yann.petitjean06@gmail.com',
          Name: 'Matcha',
        },
        To: [
          {
            Email: email,
            Name: firstname,
          },
        ],
        TemplateID: 1091114,
        TemplateLanguage: true,
        Subject: 'Matcha - Mot de passe oublié',
        Variables: {
          firstname,
          COMFIRMATION_TOKEN: token,
        },
      },
    ],
  });

  await request.catch(err => {
    if (process.env.VERBOSE === 'true') console.log(err);
  });
};

module.exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
