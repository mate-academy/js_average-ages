'use strict';

function getAverage(arr) {
  return arr.reduce((sum, x) => sum + x, 0) / arr.length;
}

function isCenturyValid(century) {
  return function(person) {
    const centuryDeath = Math.ceil(person.died / 100);

    return century === centuryDeath;
  };
}

function isMan(person) {
  return person.sex === 'm';
}

function isWoman(person) {
  return person.sex === 'f';
}

function hasChildren(people) {
  const mothers = people.reduce((mothersArray, person) => {
    return person.mother ? mothersArray.concat(person.mother) : mothersArray;
  }, []);

  return function(person) {
    return mothers.includes(person.name);
  };
}

function calculateAverageAge(people, ...checks) {
  const menAges = people.reduce((ages, person, persons) => {
    const age = person.died - person.born;

    return checks.every(check => check(person))
      ? ages.concat(age) : ages;
  }, []);

  return getAverage(menAges);
}

function calculatePeopleAverageAgeDiff(people, ...checks) {
  const childrens = people.filter(person => {
    return checks.every(check => check(person)) && person.mother;
  });
  const differences = childrens.reduce((diffs, person) => {
    const mother = people.find(x => x.name === person.mother);

    return mother ? diffs.concat(person.born - mother.born) : diffs;
  }, []);

  return getAverage(differences);
}

function calculateMenAverageAge(people, century) {
  return century
    ? calculateAverageAge(people, isMan, isCenturyValid(century))
    : calculateAverageAge(people, isMan);
}

function calculateWomenAverageAge(people, withChildren) {
  return withChildren
    ? calculateAverageAge(people, isWoman, hasChildren(people))
    : calculateAverageAge(people, isWoman);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  return onlyWithSon
    ? calculatePeopleAverageAgeDiff(people, isMan)
    : calculatePeopleAverageAgeDiff(people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
