'use strict';

function getAverage(arr) {
  return arr.reduce((sum, x) => sum + x, 0) / arr.length;
}

function isCenturyValid(century) {
  return function(person) {
    const centuryDeath = Math.ceil(person.died / 100);

    if (!century) {
      return true;
    }

    if (century === centuryDeath) {
      return true;
    }

    return false;
  };
}

function isMan(person) {
  return person.sex === 'm';
}

function isWomen(person) {
  return person.sex === 'f';
}

function hasChildren(people) {
  const mothers = people.reduce((mothersArray, person) => {
    if (person.mother !== null) {
      return mothersArray.concat(person.mother);
    }

    return mothersArray;
  }, []);

  return function(person) {
    return mothers.includes(person.name);
  };
}

function calculateAverageAge(people, ...checks) {
  const menAges = people.reduce((ages, person, persons) => {
    const age = person.died - person.born;

    if (checks.every(check => check(person))) {
      return ages.concat(age);
    }

    return ages;
  }, []);

  return getAverage(menAges);
}

function calculateMenAverageAge(people, century) {
  return calculateAverageAge(people, isMan, isCenturyValid(century));
}

function calculateWomenAverageAge(people, withChildren) {
  if (withChildren) {
    return calculateAverageAge(people, isWomen, hasChildren(people));
  }

  return calculateAverageAge(people, isWomen);
}

function calculatePeopleAverageAge(people, ...checks) {
  const childrens = people.filter(person => {
    if (checks.every(check => check(person))) {
      return person.mother !== null;
    }
  });
  const differences = childrens.reduce((diffs, person) => {
    const mother = people.find(x => x.name === person.mother);

    if (mother) {
      return diffs.concat(person.born - mother.born);
    }

    return diffs;
  }, []);

  return getAverage(differences);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  if (onlyWithSon) {
    return calculatePeopleAverageAge(people, isMan);
  }

  return calculatePeopleAverageAge(people);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
