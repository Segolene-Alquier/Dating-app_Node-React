import mailjet from '../config/mailerConfig';

const sendSigninEmail = async (email, firstname, token) => {
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
        TemplateID: 1085893,
        TemplateLanguage: true,
        Subject: 'Bienvenue chez Matcha',
        Variables: {
          firstname,
          COMFIRMATION_TOKEN: token,
        },
      },
    ],
  });

  await request
    .then(result => {
      console.log(result.body);
    })
    .catch(err => {
      console.log(err.statusCode);
    });
};

module.exports.sendSigninEmail = sendSigninEmail;
