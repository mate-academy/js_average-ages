'use strict';

function calculateMenAverageAge(people, century) {
  let yearCount = 0;

  const filteredUsers = century === undefined
    ? people.filter(user => user.sex === 'm')
    : people.filter(user => user.sex === 'm'
      && century === Math.ceil(user.died / 100));

  const userCount = filteredUsers.length;

  filteredUsers.map(user => {
    yearCount += user.died - user.born;
  });

  return +(yearCount / userCount).toFixed(2);
}

function calculateWomenAverageAge(people, withChildren = false) {
  let ageCount = 0;

  const filteredUsers = withChildren
    ? people.filter(user => user.sex === 'f'
      && (checkChield(user.name, people)))
    : people.filter(user => user.sex === 'f');
  const womanCount = filteredUsers.length;

  filteredUsers.map(user => {
    ageCount += (user.died - user.born);
  });

  return +(ageCount / womanCount).toFixed(2);

  function checkChield(motherName, usersList) {
    return usersList.find(user => user.mother === motherName);
  };
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let ageCount = 0;
  let womanCount = 0;

  const filteredUsers = onlyWithSon
    ? people.filter(user => {
      return user.sex === 'f'
        && (checkChild(user.name, user.born, people, true));
    })
    : people.filter(user => {
      return user.sex === 'f'
        && (checkChild(user.name, user.born, people));
    });

  womanCount = onlyWithSon ? womanCount : filteredUsers.length;

  return +(ageCount / womanCount).toFixed(2);

  function checkChild(motherName, motherBirth, usersList, onlyMan = false) {
    const resultOfCheck = onlyMan
      ? usersList.filter(user => {
        let ourResult = user.mother === motherName && user.sex === 'm'
          ? ageCount += user.born - motherBirth
          : false;

        ourResult = ourResult ? womanCount++ : false;

        return ourResult;
      })
      : usersList.filter(user => {
        const ourResult = user.mother === motherName
          ? ageCount += user.born - motherBirth
          : false;

        return ourResult;
      });

    return resultOfCheck;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
