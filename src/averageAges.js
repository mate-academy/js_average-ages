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
  const men = people.filter(man =>
    century
      ? man.sex === 'm'
          && Math.ceil(man.died / 100) === century
      : man.sex === 'm');

  const agesSum = men.reduce(addAge, 0);

  return agesSum / men.length;
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
  const women = people.filter(woman =>
    withChildren
      ? people.some(children => children.mother === woman.name)
          && woman.sex === 'f'
      : woman.sex === 'f');

  const agesSum = women.reduce(addAge, 0);

  return agesSum / women.length;
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
  const childrens = people.filter(person =>
    onlyWithSon
      ? person.sex === 'm'
        && people.some(woman => woman.name === person.mother)
      : people.some(woman => woman.name === person.mother)
  );

  const mothersYears = childrens.map(children => {
    const mother = people.find(woman => children.mother === woman.name);

    return children.born - mother.born;
  });

  const diffSum = mothersYears.reduce((a, b) => a + b, 0);

  return diffSum / mothersYears.length;
}

function addAge(sum, person) {
  return sum + person.died - person.born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
