'use strict';

function calculateMenAverageAge(people, century = 0) {
  const men = getMansArray(people);

  let menInCentury = [];

  if (century !== 0) {
    menInCentury = men.filter((man) => {
      if (Math.ceil(man.died / 100) === century) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    menInCentury = men;
  }

  const ages = menInCentury.map((man) => {
    return man.died - man.born;
  });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return ages.reduce(reducer) / ages.length;
}

function calculateWomenAverageAge(people, withChildren = false) {
  const allWomen = getWomansArray(people);

  let mothers = [];

  if (withChildren) {
    mothers = findMothers(people);
  } else {
    mothers = allWomen;
  }

  const ages = mothers.map((woman) => {
    return woman.died - woman.born;
  });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return ages.reduce(reducer) / ages.length;
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let children = findChildren(people);
  const sons = findChildren(people).filter(child => child.sex === 'm');

  if (onlyWithSon) {
    children = sons;
  }

  const averageAgeDiff = children.reduce((sum, child) => {
    return sum + child.born - people.find(person =>
      person.name === child.mother).born;
  }, 0) / children.length;

  return averageAgeDiff;
}

function getMansArray(people) {
  const men = people.filter((person) => person.sex === 'm');

  return men;
}

function getWomansArray(people) {
  const women = people.filter((person) => person.sex === 'f');

  return women;
}

function findMothers(people) {
  const women = people.filter(person => person.sex === 'f');
  const mothers = women.filter(person =>
    people.some(child => person.name === child.mother));

  return mothers;
}

function findChildren(people) {
  const children = people.filter(person =>
    people.some(parent => person.mother === parent.name));

  return children;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
