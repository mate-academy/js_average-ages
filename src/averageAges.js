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
  // let men = people
  //   .filter(({ sex }) => sex === 'm');
  const men = people.filter(({ died, sex }) => century
    ? Math.ceil(died / 100) === century && sex === 'm'
    : sex === 'm');

  const averageAgeOfMen = men
    .reduce((acc, { died, born }) => acc + died - born, 0);

  return averageAgeOfMen / men.length;
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
  const women = people.filter(({ name, sex }) => withChildren
    ? people.some(({ mother }) => name === mother)
    : sex === 'f');

  const averageWomenAge = women
    .reduce((acc, { died, born }) => acc + died - born, 0);

  return averageWomenAge / women.length;
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
  const children = people.filter(({ mother, sex }) => onlyWithSon
    ? people.some(({ name }) => name === mother && sex === 'm')
    : people.some(({ name }) => name === mother));

  const years = children.map(
    ({ born, mother }) => born - people.find(
      ({ name }) => name === mother).born);

  return years.reduce((acc, age) => acc + age) / years.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
