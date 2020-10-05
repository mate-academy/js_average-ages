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
  let filteredPeople = people.filter(({ sex }) => sex === 'm');

  if (century) {
    filteredPeople = filteredPeople.filter(({ died }) => {
      return century === Math.ceil(died / 100);
    });
  };

  const sumOfAges = filteredPeople.reduce((sum, { died, born }) => {
    return sum + (died - born);
  }, 0);

  return sumOfAges / filteredPeople.length;
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

  if (withChildren !== undefined) {
    // eslint-disable-next-line max-len
    women = people.filter(person => person.sex === 'f' && people.some(human => human.mother === person.name));
  } else {
    women = people.filter(person => person.sex === 'f');
  }

  const totalAge = women.reduce((sum, cur) => sum + (cur.died - cur.born), 0);

  return totalAge / women.length;
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
  const children = people.filter(person => !onlyWithSon
    ? people.find(mother => person.mother === mother.name)
    : people.find(mother => person.mother === mother.name && person.sex === 'm')
  );

  const ageDifferencesList = children.map(person => person.born
    - people.find(mother => person.mother === mother.name).born);
    // eslint-disable-next-line max-len
  const totalAgeDifferences = ageDifferencesList.reduce((a, b) => a + b, 0);

  return totalAgeDifferences / ageDifferencesList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
