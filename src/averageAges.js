'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
const getSex = (people, sex) => people.filter(person => person.sex === sex);

function calculateMenAverageAge(people, century) {
  let men = getSex(people, 'm');

  const menInCentury = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  men = century
    ? menInCentury
    : men;

  const averageMenAge = men.reduce(
    (sum, man) => sum + (man.died - man.born), 0
  ) / men.length;

  return averageMenAge;
}

function calculateWomenAverageAge(people, withChildren) {
  let women = getSex(people, 'f');

  const womenWithKids = people.filter(
    person => people.some(child => child.mother === person.name));

  women = withChildren
    ? womenWithKids
    : women;

  const averageWomenAge = women.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0
  ) / women.length;

  return averageWomenAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  let childrens = people.filter(
    child => people.some(mother => mother.name === child.mother));

  const boys = getSex(childrens, 'm');

  childrens = onlyWithSon
    ? boys
    : childrens;

  const averageAgeDiff = childrens.reduce(
    (sum, child) => sum + (child.born - people.find(
      mom => child.mother === mom.name).born), 0
  ) / childrens.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
