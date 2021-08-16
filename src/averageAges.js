'use strict';

function calculateAverageAge(userList) {
  return +(userList.reduce((prevUser, secondUser) =>
    prevUser + secondUser.died - secondUser.born, 0)
    / userList.length).toFixed(2);
}

function calculateMenAverageAge(people, century) {
  const filteredUsers = century === undefined
    ? people.filter(user => user.sex === 'm')
    : people.filter(user => user.sex === 'm'
      && century === Math.ceil(user.died / 100));

  return calculateAverageAge(filteredUsers);
}

function calculateWomenAverageAge(people, withChildren = false) {
  const filteredUsers = withChildren
    ? people.filter(user => user.sex === 'f'
      && people.find(child => child.mother === user.name))
    : people.filter(user => user.sex === 'f');

  return calculateAverageAge(filteredUsers);
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let childList = onlyWithSon
    ? people.filter(user => user.sex === 'm' && user.mother !== null)
    : people.filter(user => user.mother !== null);

  childList = childList.filter(child =>
    people.find(user => user.name === child.mother)
  );

  const ageDiffArr = childList.map(child =>
    child.born - people.find(user => user.name === child.mother).born);

  return ageDiffArr.reduce((fistValue, secondValue) =>
    fistValue + secondValue, 0) / ageDiffArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
