'use strict';

const FEMALE = 'f';
const MALE = 'm';
const HUNDRED = 100;

function getAverageAge(people) {
  return people.reduce((accum, { died, born }) =>
    (accum + (died - born)), 0) / people.length;
};

function getAgeDiff(people1, people2) {
  return ((people1.reduce((accum, { born, mother }) =>
    accum + born - people2.find(({ name }) => mother
      === name).born, 0)) / people1.length).toFixed(2);
};

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(({ sex }) => sex === MALE);

  const men = century
    ? allMen.filter(({ died }) => Math.ceil(died / HUNDRED) === century)
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

  const sons = children.filter(({ sex }) => sex === MALE);

  return onlyWithSon
    ? +getAgeDiff(sons, people)
    : +getAgeDiff(children, people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
