/* eslint-disable no-unused-expressions */
'use strict';

function getRoundNumber(number) {
  return +number.toFixed(2);
}

function getHumanAge(human) {
  const { born, died } = human;
  const humanAge = died - born;

  return humanAge;
}

function calculateMenAverageAge(people, century) {
  const manList = people.filter(human => human.sex === 'm');
  let manCount;
  let manAgeList;
  let manAverageAge;
  let manDiedInThisCentury;

  (century) ? (
    manDiedInThisCentury = manList.filter(function(man) {
      const { died } = man;

      return Math.ceil(died / 100) === century;
    }),
    manCount = manDiedInThisCentury.length,
    manAgeList = manDiedInThisCentury.map(getHumanAge),
    manAverageAge = manAgeList.reduce(
      (current, next) => current + next) / manCount
  ) : (
    manCount = manList.length,
    manAgeList = manList.map(getHumanAge),
    manAverageAge = manAgeList.reduce(
      (current, next) => current + next) / manCount
  );

  return getRoundNumber(manAverageAge);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenList = people.filter(human => human.sex === 'f');
  let womenCount;
  let womenAgeList;
  let womenAverageAge;
  let filteredPeopleList;
  let motherList;
  let womenWhichHaveChild;

  (withChildren) ? (
    filteredPeopleList = people.filter(women => women.mother),
    motherList = Array.from(new Set(filteredPeopleList.map(
      human => human.mother
    ))),
    womenWhichHaveChild = womenList.filter(
      women => motherList.includes(women.name)
    ),
    womenCount = womenWhichHaveChild.length,
    womenAgeList = womenWhichHaveChild.map(getHumanAge),
    womenAverageAge = womenAgeList.reduce(
      (current, next) => current + next) / womenCount
  ) : (
    womenCount = womenList.length,
    womenAgeList = womenList.map(getHumanAge),
    womenAverageAge = womenAgeList.reduce(
      (current, next) => current + next) / womenCount
  );

  return getRoundNumber(womenAverageAge);
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
