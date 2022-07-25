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
const sumOfAges = (filter) => (filter
  .reduce((sum, { died, born }) => (sum + (died - born)), 0));

function calculateMenAverageAge(people, century) {
  const manFilter = people.filter(person => person.sex === 'm'
    && (century ? (Math.ceil(person.died / 100) === century) : 1)
  );

  return sumOfAges(manFilter) / manFilter.length;
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
  const mothers = people.map(person => person.mother);

  const womanFilter = people.filter(person => withChildren
    ? (mothers.includes(person.name))
    : person.sex === 'f'
  );

  return sumOfAges(womanFilter) / womanFilter.length;
};

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their allMothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const isMother = (name) => (
    people.find(mother => name === mother.name)
  );

  const kidsFilter = people
    .filter(person => isMother(person.mother)
    && (onlyWithSon ? person.sex === 'm' : 1));

  const sumOfMathersAge = kidsFilter
    .reduce((sum, { born, mother }) => (
      sum + born - isMother(mother).born
    ), 0);

  return sumOfMathersAge / kidsFilter.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
