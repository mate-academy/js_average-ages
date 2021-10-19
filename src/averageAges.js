/* eslint-disable no-unused-expressions */
'use strict';

function getRoundNumber(number) {
  return +number.toFixed(2);
}

function calculateMenAverageAge(people, century) {
  const isMan = person => person.sex === 'm';
  const wasDiedInCentury = person =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century;

  const manList = people.filter(
    century ? wasDiedInCentury : isMan
  );

  const averageAge = manList.reduce(
    (summary, person) => {
      const personAge = person.died - person.born;

      return summary + personAge;
    }, 0) / manList.length;

  return getRoundNumber(averageAge);
}

function calculateWomenAverageAge(people, withChildren) {
  const isWoman = person => person.sex === 'f';

  const haveChild = person => people.some(
    child => child.mother === person.name
  );

  const womenList = people.filter(
    withChildren ? haveChild : isWoman
  );

  const averageAge = womenList.reduce(
    (summary, person) => {
      const personAge = person.died - person.born;

      return summary + personAge;
    }, 0) / womenList.length;

  return getRoundNumber(averageAge);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenList = people.filter(human =>
    people.find(mother => human.mother === mother.name)
      && (!onlyWithSon || human.sex === 'm'
      ));
  const childrenCount = childrenList.length;

  const averageAgeDiff = childrenList.reduce((value, child) =>
    value + (child.born - people.find(person =>
      person.name === child.mother).born), 0) / childrenCount;

  return getRoundNumber(averageAgeDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
