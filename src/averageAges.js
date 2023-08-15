'use strict';

const FEMALE = 'f';
const MALE = 'm';
const CENTURY_VALUE = 100;

function getAverageAge(people) {
  return people.reduce((accum, { died, born }) =>
    (accum + (died - born)), 0) / people.length;
};

function getAgeDiff(children, people) {
  const ageDiff = children.reduce((acc, { born, mother: motherName }) => {
    const motherBirthYear = people.find(({ name }) => motherName === name).born;

    return acc + born - motherBirthYear;
  }, 0);

  return +(ageDiff / children.length).toFixed(2);
};

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(({ sex }) => sex === MALE);

  const men = century
    ? allMen.filter(({ died }) => Math.ceil(died / CENTURY_VALUE) === century)
    : allMen;

  return getAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(({ sex }) => sex === FEMALE);

  const women = withChildren
    ? allWomen.filter(({ name }) => people.some(({ mother }) =>
      name === mother))
    : allWomen;

  return getAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(({ mother }) => people.some(({ name }) =>
    mother === name));

  return !onlyWithSon
    ? getAgeDiff(children, people)
    : getAgeDiff(children.filter(({ sex }) => sex === MALE), people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
