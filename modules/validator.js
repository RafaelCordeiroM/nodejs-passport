const {readFileSync} = require('fs');
const path = require('path');

let helpers = {
  /**
   *
   */
  min(data, min, errors){
    if (data.length < min) errors.push(`${data} must be longer than ${min}`);
  },
  /**
   *
   */
  max(data, max, errors){
    if (data.length > max) errors.push(`${data} must be smaller than ${max}`);
  },
  /**
   *
   */
  type(data, type, errors){
    // patterns
    const patterns = {
      email: /^[a-zA-Z0-9-_.+]+@[a-zA-Z0-9-_.]+?\.[a-zA-Z]{2,3}$/,
      number: /^[0-9]*$/,
    };

    switch (type){
      case 'email':
        if (!patterns.email.test(data)){
          errors.push('email invalid');
        }
        break;
      case 'number':
        if (!patterns.number.test(data)){
          errors.push(`${data} does not contain only numbers`);
        }
        break;
    }
  },
};

module.exports.user = async(data) => {
  let errors = [];
  let rules = readFileSync(
    path.join(__dirname, '../modules/validator/user.json'),
    'utf-8');

  // Pasing JSON to js object
  rules = JSON.parse(rules);

  for (let index in data){
    for (let func in rules[index]){

      // check if helper exists
      if (!helpers[func]){
        console.log(`helper validation function: "${func}" does not exist`);
        return;
      }
      helpers[func](
        data[index],
        rules[index][func],
        errors
      );

    }
  }
  if (errors){
    let err = new Error();
    err.data = errors;
    err.code = 422;
    throw err;
  }
  return data;
};

module.exports.book = async(data) => {
  let errors = [];
  let rules = readFileSync(
    path.join(__dirname, '../modules/validator/book.json'),
    'utf-8');

  // Pasing JSON to js object
  rules = JSON.parse(rules);

  for (let index in data){
    for (let func in rules[index]){

      // check if helper exists
      if (!helpers[func]){
        console.log(`helper validation function: "${func}" does not exist`);
        return;
      }

      // data[index]        = "Gabriel Gomes"
      // func               = "min"
      // rules[index][func] = 3
      helpers[func](
        data[index],
        rules[index][func],
        errors
      );

    }
  }

  if (errors.length !== 0){
    let err = new Error();
    err.data = errors;
    err.code = 422;
    throw err;
  }
  return data;
};
