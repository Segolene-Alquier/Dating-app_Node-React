require('dotenv').config({ path: './../../../../.env' });
const faker = require('faker/locale/fr');
const _ = require('lodash');
const User = require('./model');
const Interest = require('./../interests/model');

const user = new User();
const interest = new Interest();
const axios = require('axios');

let interestsList = [];

const createFakeUser = async () => {
  const firstName = faker.name.firstName();
  const surname = faker.name.lastName();
  const userName = firstName.toLowerCase() + faker.random.number();
  const password = faker.internet.password();
  const email = `${userName}@growth-tools.tk`;

  console.log(firstName, surname, userName, password, email);
  return {
    ...(await user.create({
      firstname: firstName,
      surname,
      username: userName,
      password,
      email,
    })),
    userName,
    password,
  };
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomArrayInt(min, max) {
  const array = [];
  array[0] = randomInteger(min, max);
  array[1] = randomInteger(min, max);
  array[2] = randomInteger(min, max);
  return _.sortBy(_.uniq(array));
}

function randomArrayOfInterests(nbOfElements) {
  const array = [];
  for (let i = 0; i < nbOfElements; i++) {
    array[i] = interestsList[Math.floor(Math.random() * interestsList.length)];
  }
  return _.sortBy(_.uniq(array));
}

const generateFakeImages = () => {
  return axios
    .get(
      'https://api.generated.photos/api/v1/faces?api_key=0c_nmVH48EoxfDeTmn_-3Q&per_page=5&order_by=random',
    )
    .then(res => {
      return res.data.faces.map(face => {
        return face.urls[4]['512'];
      });
    });
};

const updateFakeUser = async userId => {
  const infos = {};
  infos.validated = true;
  infos.description = faker.lorem.paragraphs();
  infos.location = [];
  // latitude : entre 48.60 et 48.99
  infos.location[0] = parseFloat(`48.${randomInteger(60, 99)}`);
  // longitude : entre 2.30 et 2.60
  infos.location[1] = parseFloat(`2.${randomInteger(30, 60)}`);
  const now = new Date();
  infos.lastVisit = now.toISOString();
  infos.popularityRate = randomInteger(20, 90);
  infos.birthDate = faker.date.between('1940-01-01', '2001-12-31');
  infos.gender = randomArrayInt(1, 7);
  infos.sexualOrientation = randomArrayInt(1, 7);
  infos.interests = randomArrayOfInterests(10);
  infos.images = await generateFakeImages();
  infos.profilePicture = infos.images[0];
  await user.updateById(userId, infos);
};

const generateProfiles = async nbOfProfiles => {
  interestsList = await interest.getAll().then(list => {
    return list.map(element => element.name);
  });
  let profiles = [];
  for (let i = 0; i < nbOfProfiles; i++) {
    let userId = 0;
    const newUser = await createFakeUser();
    if (newUser.created) {
      userId = newUser.id;
      await updateFakeUser(userId);
      profiles.push(
        `new user created with id: ${userId} , username: ${newUser.userName} , password:  ${newUser.password}`,
      );
    }
  }
  profiles.forEach(profile => console.log(profile));
};

generateProfiles(2);
