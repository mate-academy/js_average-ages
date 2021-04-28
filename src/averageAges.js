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
  let men = people.filter(({ sex }) => sex === 'm');

  if (century) {
    men = men.filter(({ died }) => Math.ceil(died / 100) === century);
  }

  const result = men.reduce((a, b) => a + (b.died - b.born), 0);

  return +(result / men.length).toFixed(2);
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
  let women = people.filter(({ sex }) => sex === 'f');

  if (withChildren) {
    women = women.filter(woman => {
      return people.find(({ mother }) => mother === woman.name);
    });
  }

  const result = women.reduce((a, b) => a + (b.died - b.born), 0);

  return +(result / women.length).toFixed(2);
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
  let children = people.filter(({ mother }) => {
    return people.find(({ name }) => name === mother);
  });
  const mothersAges = [];

  if (onlyWithSon) {
    children = children.filter(({ sex }) => sex === 'm');
  }

  children.forEach(({ mother, born: childBorn }) => {
    const motherBorn = people.find(person => person.name === mother).born;

    mothersAges.push(childBorn - motherBorn);
  });

  const result = mothersAges.reduce((a, b) => a + b, 0);

  return +(result / mothersAges.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
