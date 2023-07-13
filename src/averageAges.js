'use strict';

function calculateMenAverageAge(people, century) {
  const MAN_SEX = 'm';
  const isMan = (el) => el.sex === MAN_SEX;
  const HUNDRED = 100;
  const isDiedEquelCenture = (el) => Math.ceil(el.died / HUNDRED) === century;

  const filterMan = people.filter(el => isMan(el));
  const filterManWithCentureArg
    = people.filter(el => isDiedEquelCenture(el) && isMan(el));

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
  const SEX_WOMAN = 'f';
  const isWoman = (el) => el.sex === SEX_WOMAN;
  const isMother = (woman) => people.some(el => el.mother === woman.name);
  const filterWomanWithChild
    = people.filter(woman => isWoman(woman) && isMother(woman));

  const filterWoman = people.filter(woman => isWoman(woman));

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
  const SEX_MAN = 'm';
  const isMan = (el) => el.sex === SEX_MAN;
  const isChildHasMother = (child) =>
    people.some(mother => child.mother === mother.name);

  const filterAllChilds = people.filter(child => isChildHasMother(child));
  const filterChildsOnlySon = filterAllChilds.filter(el => isMan(el));

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
