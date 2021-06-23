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
  const men = people.filter((item) =>
    century
      ? centuryOfLife(item) === century && item.sex === 'm'
      : item.sex === 'm');
  const lifetime = lifespan(men);

  return averageaAge(lifetime);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter((item) =>
    withChildren
      ? item.sex === 'f' && people.find(child => item.name === child.mother)
      : item.sex === 'f');

  const lifetime = lifespan(women);

  return averageaAge(lifetime);
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
  const children = people.filter(person =>
    onlyWithSon
      ? person.sex === 'm' && people.some(mom => mom.name === person.mother)
      : people.some(mom => mom.name === person.mother));

  const yearsOld = children.map(item => {
    const mother = people.find(mom => item.mother === mom.name);

    return item.born - mother.born;
  });

  return averageaAge(yearsOld);
}

const centuryOfLife = obj => Math.ceil(obj.died / 100);
const lifespan = arr => arr.map(item => item.died - item.born);
const averageaAge = arr => arr.reduce((acc, el) => acc + el) / arr.length;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
