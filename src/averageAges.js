'use strict';

const filterBySex = (people, sex) => {
  return people.filter(x => x.sex === sex);
};

const getAverageAge = (people) => {
  return people.reduce((x, y) => x + (y.died - y.born), 0) / people.length;
};

const filterMothers = (people, women) => {
  return women.filter(x => people.map(y => y.mother).includes(x.name));
};

const filterChildren = (people, mothers) => {
  const children = people.filter(x => x.mother !== null);

  return children.filter(x => mothers.map(y => y.name).includes(x.mother));
};

const parentChildAgeDiff = (parents, children) => {
  return children.reduce(
    (x, y) => x + (y.born - parents.filter(
      z => z.name === y.mother)[0].born), 0);
};

function calculateMenAverageAge(people, century = 0) {
  let men = filterBySex(people, 'm');

  if (century > 0) {
    men = men.filter(x => Math.ceil(x.died / 100) === century);
  }

  return getAverageAge(men);
}

function calculateWomenAverageAge(people, withChildren) {
  let women = filterBySex(people, 'f');

  if (withChildren) {
    women = filterMothers(people, women);
  }

  return getAverageAge(women);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = filterMothers(people, filterBySex(people, 'f'));

  let children = filterChildren(people, mothers);

  if (onlyWithSon) {
    children = filterBySex(children, 'm');
  }

  const motherChildAgeDiff = parentChildAgeDiff(mothers, children);

  return motherChildAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
