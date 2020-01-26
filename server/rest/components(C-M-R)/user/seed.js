require('dotenv').config({ path: './../../../../.env' });
const faker = require('faker/locale/fr');
const _ = require('lodash');
const User = require('./model');
const Interest = require('./../interests/model');
const user = new User();
const interest = new Interest();

var interestsList = [];

const createFakeUser = () => {
  const firstName = faker.name.firstName();
  const surname = faker.name.lastName();
  const userName = firstName + faker.random.number();
  const password = faker.internet.password();
  const email = userName + '@growth-tools.tk';

  console.log(firstName, surname, userName, password, email);
  return user.create({
    firstname: firstName,
    surname,
    username: userName,
    password,
    email,
  });
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomArrayInt(min, max) {
  let array = [];
  array[0] = randomInteger(min, max);
  array[1] = randomInteger(min, max);
  array[2] = randomInteger(min, max);
  array[3] = randomInteger(min, max);
  return _.sortBy(_.uniq(array));
}

function randomArrayOfInterests(nbOfElements) {
  let array = [];
  for (i = 0; i < nbOfElements; i++) {
    array[i] = interestsList[Math.floor(Math.random() * interestsList.length)];
  }
  return _.sortBy(_.uniq(array));
}

const updateFakeUser = userId => {
  let infos = {};
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
  infos.birthDate = faker.date.past();
  infos.gender = randomArrayInt(1, 7);
  infos.sexualOrientation = randomArrayInt(1, 7);
  infos.interests = randomArrayOfInterests(10);

  user.updateById(userId, infos);
};

const main = async () => {
  let userId = 0;
  interestsList = await interest.getAll().then(list => {
    return list.map(element => element.name);
  });
  const user = await createFakeUser();
  if (user.created) {
    userId = user.id;
  }
  updateFakeUser(userId);
  console.log(`new user created with id: ${userId}`)
};

main();
