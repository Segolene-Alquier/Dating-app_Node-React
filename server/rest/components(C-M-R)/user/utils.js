/* eslint-disable no-async-promise-executor */
/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
const _ = require('lodash');
const Gender = require('../gender/model');
const Visit = require('../visit/model');
const User = require('../user/model');

const genderInstance = new Gender();

class UserInputTests {
  constructor(User) {
    this.user = User;
  }

  isEmail({ input }) {
    return new Promise(function(resolve) {
      const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (input === '')
        resolve({ boolean: false, error: `The email is blank` });
      if (input.match(regex)) resolve({ boolean: true });
      resolve({
        boolean: false,
        error: `The email you entered is not correct`,
      });
    });
  }

  isAlphaNum({ input, inputName }) {
    return new Promise(function(resolve) {
      const regex = /^[0-9a-zA-Z]+$/;
      if (input === '') {
        resolve({ boolean: false, error: `The ${inputName} is blank` });
      }
      if (input.match(regex)) resolve({ boolean: true });
      resolve({
        boolean: false,
        error: `The ${inputName} must contain only letters and numbers`,
      });
    });
  }

  isAlpha({ input, inputName }) {
    return new Promise(function(resolve) {
      const regex = /^[a-zA-Z]+$/;
      if (input === '')
        resolve({ boolean: false, error: `The ${inputName} is blank` });
      if (input.match(regex)) resolve({ boolean: true });
      resolve({
        boolean: false,
        error: `The ${inputName} must contain only letters`,
      });
    });
  }

  isAlphaSpaceDash({ input, inputName }) {
    return new Promise(function(resolve) {
      const regex = /^[\w\s#-]+$/;
      if (input === '')
        resolve({ boolean: false, error: `The ${inputName} is blank` });
      if (input.match(regex)) resolve({ boolean: true });
      resolve({
        boolean: false,
        error: `The ${inputName} must contain only letters`,
      });
    });
  }

  isBoolean({ input, inputName }) {
    return new Promise(function(resolve) {
      if (input === true || input === false) resolve({ boolean: true });
      else
        resolve({ boolean: false, error: `The ${inputName} is not a boolean` });
    });
  }

  exists({ input, inputName, modelInstance }) {
    return new Promise(async function(resolve) {
      const call = await modelInstance.exists(inputName, input);
      if (call === true)
        resolve({ boolean: false, error: `The ${inputName} already exists` });
      else resolve({ boolean: true });
    });
  }

  doesntExist({ input, inputName, modelInstance, modelName }) {
    return new Promise(async function(resolve) {
      const intInput = parseInt(input, 10);
      const result = await modelInstance.exists(inputName, intInput);
      if (result === true) resolve({ boolean: true });
      else
        resolve({
          boolean: false,
          error: `Please select at least one gender and one sexual orientation`,
        });
    });
  }

  doesntExistEach({ input, inputName, modelInstance, modelName }) {
    return new Promise(async function(resolve) {
      const intInput = parseInt(input, 10);
      const call = await modelInstance.exists(inputName, intInput);
      if (call === true) resolve({ boolean: true });
      else
        resolve({ boolean: false, error: `This ${modelName} doesn't exist` });
    });
  }

  passwordFormat({ input }) {
    return new Promise(function(resolve) {
      const regex = /^(?=.*\d).{6,15}$/g;
      if (!input) resolve({ boolean: false, error: 'This password is empty!' });
      if (input.match(regex)) resolve({ boolean: true });
      resolve({
        boolean: false,
        error:
          'The Password must contain between 6 and 15 characters and one number',
      });
    });
  }

  rightLength({ input, inputName, minLength, maxLength }) {
    return new Promise(function(resolve) {
      if (input === '') {
        resolve({ boolean: false, error: `The ${inputName} is blank` });
      }
      if (input.length >= minLength && input.length <= maxLength) {
        resolve({ boolean: true });
      } else {
        resolve({
          boolean: false,
          error: `The ${inputName} must contain between ${minLength} and ${maxLength} characters`,
        });
      }
    });
  }

  async createUserErrors(data) {
    const errors = [];
    // eslint-disable-next-line no-unused-vars
    const { firstname, surname, username, email, password } = data;

    if (!this.mandatoryFields(data)) {
      errors.push('Some fields were left blank!');
      return errors;
    }
    await this.inputTester(
      {
        input: firstname,
        inputName: 'first name',
        minLength: 2,
        maxLength: 40,
      },
      [this.isAlpha, this.rightLength],
      errors,
    );
    await this.inputTester(
      { input: surname, inputName: 'surname', minLength: 2, maxLength: 40 },
      [this.isAlpha, this.rightLength],
      errors,
    );
    await this.inputTester(
      {
        input: username,
        inputName: 'username',
        minLength: 2,
        maxLength: 15,
        modelInstance: this.user,
      },
      [this.isAlphaNum, this.rightLength, this.exists],
      errors,
    );
    await this.inputTester(
      { input: email, inputName: 'email', modelInstance: this.user },
      [this.isEmail, this.exists],
      errors,
    );
    await this.inputTester(
      { input: password, inputName: 'password', modelInstance: this.user },
      [this.passwordFormat],
      errors,
    );
    return errors;
  }

  async inputTester(variable, functions, errors) {
    if (variable.input === undefined) {
      return;
    }
    const promises = functions.map(async oneFunction => {
      return oneFunction(variable);
    });
    await Promise.all(promises).then(values => {
      values.forEach(value => {
        if (value.boolean === false && !errors.includes(value.error)) {
          errors.push(value.error);
        }
      });
    });
  }

  async updateUserErrors(data) {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line max-len
    const {
      firstname,
      surname,
      username,
      email,
      gender,
      sexualOrientation,
      notificationMail,
    } = data;

    const errors = [];
    await this.inputTester(
      {
        input: firstname,
        inputName: 'first name',
        minLength: 2,
        maxLength: 40,
      },
      [this.isAlphaSpaceDash, this.rightLength],
      errors,
    );
    await this.inputTester(
      { input: surname, inputName: 'surname', minLength: 2, maxLength: 40 },
      [this.isAlphaSpaceDash, this.rightLength],
      errors,
    );
    await this.inputTester(
      {
        input: username,
        inputName: 'username',
        minLength: 2,
        maxLength: 15,
        modelInstance: this.user,
      },
      [this.isAlphaNum, this.rightLength, this.exists],
      errors,
    );
    await this.inputTester(
      { input: email, inputName: 'email', modelInstance: this.user },
      [this.isEmail, this.exists],
      errors,
    );
    await this.inputTester(
      {
        input: gender,
        inputName: 'id',
        modelInstance: genderInstance,
        modelName: 'gender',
      },
      [this.doesntExist],
      errors,
    );
    await this.inputTester(
      {
        input: sexualOrientation,
        inputName: 'id',
        modelInstance: genderInstance,
        modelName: 'gender',
      },
      [this.doesntExist],
      errors,
    );
    await this.inputTester(
      { input: notificationMail, inputName: 'notification email' },
      [this.isBoolean],
      errors,
    );
    await this.inputTester(
      { input: notificationMail, inputName: 'notification email' },
      [this.isBoolean],
      errors,
    );

    return errors;
  }

  mandatoryFields(data) {
    const mandatoryValues = [
      'firstname',
      'surname',
      'username',
      'email',
      'password',
    ];
    let boolean = true;
    mandatoryValues.forEach(value => {
      if (Object.keys(data).includes(value) === false) {
        boolean = false;
      }
    });
    return boolean;
  }

  filterInputValues(requester, values) {
    let authorizedValues = [];
    if (requester === 'API')
      authorizedValues = [
        'firstname',
        'surname',
        'username',
        'email',
        'gender',
        'sexualOrientation',
        'description',
        'interests',
        'images',
        'profilePicture',
        'location',
        'notificationMail',
        'notificationPush',
        'birthDate',
      ];
    else if (requester === 'backend')
      authorizedValues = [
        'firstname',
        'surname',
        'username',
        'email',
        'gender',
        'sexualOrientation',
        'description',
        'interests',
        'images',
        'profilePicture',
        'location',
        'notificationMail',
        'notificationPush',
        'lastConnection',
        'popularityRate',
        'birthDate',
      ];
    const filteredValues = Object.keys(values)
      .filter(key => authorizedValues.includes(key))
      .reduce((obj, key) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = values[key];
        return obj;
      }, {});
    return filteredValues;
  }
}

const saveVisit = (userIdVisitor, userIdVisited) => {
  const visit = new Visit();
  visit.create(userIdVisitor, userIdVisited).then(response => {
    if (process.env.VERBOSE === 'true') console.log(response);
  });
};

const checkIfProfileCompleted = userid => {
  const user = new User();
  return user
    .getByFiltered('id', userid, [
      'firstname',
      'surname',
      'username',
      'email',
      'description',
      'images',
      'birthDate',
      'profilePicture',
      'location',
      'gender',
      'sexualOrientation',
      'interests',
    ])
    .then(data => {
      const { birthDate } = data[0];
      delete data[0].birthDate;
      if (birthDate === null) {
        return false;
      }
      return !_.some(data[0], _.isEmpty);
    });
};

module.exports.UserInputTests = UserInputTests;
module.exports.saveVisit = saveVisit;
module.exports.checkIfProfileCompleted = checkIfProfileCompleted;
