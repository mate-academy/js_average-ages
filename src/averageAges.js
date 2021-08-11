'use strict';

const filterBySex = (people, sex) => {
  return people.filter(person => person.sex === sex);
};

const getAverageAge = (people) => {
  return people
    .reduce((sumOfAges, person) =>
      sumOfAges + (person.died - person.born), 0) / people.length;
};

const filterMothers = (people, women) => {
  return women
    .filter(mother => people
      .map(daughter => daughter.mother).includes(mother.name));
};

const filterChildren = (people, mothers) => {
  const children = people.filter(person => person.mother !== null);

  return children
    .filter(child => mothers
      .map(mother => mother.name).includes(child.mother));
};

const parentChildAgeDiff = (parents, children) => {
  return children.reduce(
    (totalAge, child) => totalAge + (child.born - parents.filter(
      parent => parent.name === child.mother)[0].born), 0);
};

function calculateMenAverageAge(people, century = 0) {
  let men = filterBySex(people, 'm');

  men = century > 0
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  return getAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  let women = filterBySex(people, 'f');

  women = withChildren === true
    ? filterMothers(people, women)
    : women;

  return getAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = filterMothers(people, filterBySex(people, 'f'));

  let children = filterChildren(people, mothers);

  children = onlyWithSon === true
    ? filterBySex(children, 'm')
    : children;

  const motherChildAgeDiff = parentChildAgeDiff(mothers, children);

  return motherChildAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
