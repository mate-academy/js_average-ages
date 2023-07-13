'use strict';

function calculateMenAverageAge(people, century) {
  const filterMan = people.filter(el => el.sex === 'm');
  const filterManWithCentureArg
    = people.filter(el => Math.ceil(el.died / 100) === century
    && el.sex === 'm');

  const averageAgesForAllMan
    = filterMan.map(el => el.died - el.born)
      .reduce((acum, curVal) => acum + curVal, 0)
      / filterMan.length;

  const averageAgesWithCentureArg
    = filterManWithCentureArg.map(el => el.died - el.born)
      .reduce((acum, curVal) => acum + curVal, 0)
      / filterManWithCentureArg.length;

  return arguments.length === 2
    ? averageAgesWithCentureArg
    : averageAgesForAllMan;
}

function calculateWomenAverageAge(people, withChildren) {
  const filterWomanWithChild
    = people.filter(woman => woman.sex === 'f'
      && people.some(el => el.mother === woman.name));

  const filterWoman = people.filter(woman => woman.sex === 'f');

  const averageAgesForWomanWithChild
    = filterWomanWithChild.map(el => el.died - el.born)
      .reduce((acum, curVal) => acum + curVal, 0)
    / filterWomanWithChild.length;

  const averageAgesForWoman
  = filterWoman.map(el => el.died - el.born)
    .reduce((acum, curVal) => acum + curVal, 0)
  / filterWoman.length;

  return arguments.length === 2
    ? averageAgesForWomanWithChild
    : averageAgesForWoman;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const filterAllChilds = people.filter(child =>
    people.some(mother => child.mother === mother.name
    ));
  const filterChildsOnlySon = filterAllChilds.filter(el => el.sex === 'm');

  const averageAgesChildAndMother
    = filterAllChilds.map(el =>
      el.born - people[people.findIndex(obj => obj.name === el.mother)].born);

  const averageAgesSonAndMother
    = filterChildsOnlySon.map(el =>
      el.born - people[people.findIndex(obj => obj.name === el.mother)].born);

  return arguments.length === 2
    ? averageAgesSonAndMother.reduce((acum, curVal) =>
      acum + curVal, 0) / filterChildsOnlySon.length
    : averageAgesChildAndMother.reduce((acum, curVal) =>
      acum + curVal, 0) / filterAllChilds.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
