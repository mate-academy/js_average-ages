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

function calculateAvarage(array) {
  const number = array.reduce((sum, age) => sum + age, 0);

  return Number((number / array.length).toFixed(2));
}

function calculateMenAverageAge(people, century) {
  const sex = 'm';
  const mens = people.filter(person => century
    ? person.sex === sex && Math.ceil(person.died / 100) === century
    : person.sex === sex);

  const ages = mens.map(person => person.died - person.born);

  return calculateAvarage(ages);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person => withChildren
    ? people.some(human => human.mother === person.name)
    : person.sex === 'f');

  const ages = womens.map(person => person.died - person.born);

  return calculateAvarage(ages);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const allChilds = people.filter(person =>
    people.some(mother => mother.name === person.mother));
  const maleChilds = allChilds.filter(person => person.sex === 'm');

  const childs = (!onlyWithSon)
    ? allChilds
    : maleChilds;

  const ages = childs.map(person =>
    person.born - people.find(mother => person.mother === mother.name).born);

  return calculateAvarage(ages);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
