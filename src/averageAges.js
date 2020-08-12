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
function calculateMenAverageAge(people, century) {
  let men;

  (century)
    ? men = people.filter(person =>
      person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : men = people.filter(person => person.sex === 'm');

  const totalAge = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  return +(totalAge / men.length).toFixed(2);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women;

  (withChildren)
    ? women = people.filter(person =>
      people.some(child => child.mother === person.name))
    : women = people.filter(person => person.sex === 'f');

  const totalAge = women.reduce((sum, woman) =>
    sum + (woman.died - woman.born), 0);

  return +(totalAge / women.length).toFixed(2);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let allChilds;

  (onlyWithSon)
    ? allChilds = people.filter(person =>
      person.sex === 'm'
      && people.find(mother => mother.name === person.mother))
    : allChilds = people.filter(person =>
      people.find(mother => mother.name === person.mother));

  const ageDiff = allChilds.reduce((sum, son) =>
    sum + son.born - (people.find(mother =>
      son.mother === mother.name).born), 0);

  return +(ageDiff / allChilds.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
