'use strict';

function calculateMenAverageAge(people, century = 0) {
  const mans = getMansArray(people);

  let mansInCentury = [];

  if (century !== 0) {
    mansInCentury = mans.filter((man) => {
      if (Math.ceil(man.died / 100) === century) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    mansInCentury = mans;
  }

  const ages = mansInCentury.map((man) => {
    return man.died - man.born;
  });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return ages.reduce(reducer) / ages.length;
}

function calculateWomenAverageAge(people, withChildren = false) {
  const weman = getWomansArray(people);

  let woman = [];

  if (withChildren) {
    woman = findMothers(people);
  } else {
    woman = weman;
  }

  const ages = woman.map((person) => {
    return person.died - person.born;
  });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return ages.reduce(reducer) / ages.length;
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const allChildren = findChildren(people);
  const sons = findChildren(people).filter(child => child.sex === 'm');
  let children;

  if (onlyWithSon) {
    children = sons;
  } else {
    children = allChildren;
  }

  const averageAgeDiff = children.reduce((sum, child) => {
    return sum + child.born - people.find(person =>
      person.name === child.mother).born;
  }, 0) / children.length;

  return averageAgeDiff;
}

function getMansArray(people) {
  const mans = people.filter((person) => person.sex === 'm');

  return mans;
}

function getWomansArray(people) {
  const weman = people.filter((person) => person.sex === 'f');

  return weman;
}

function findMothers(people) {
  const woman = people.filter(person => person.sex === 'f');
  const mothers = woman.filter(person =>
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
