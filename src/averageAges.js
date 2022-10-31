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
const getAverageAge = arr => (
  arr.reduce((acc, born) => acc + born / arr.length, 0)
);

function calculateMenAverageAge(people, century) {
  const onlyMenInEighteen = people.filter(item =>
    item.sex === 'm'
  );

  const onlyMen = people.filter(item =>
    item.sex === 'm'
  ).map(item => item.died - item.born);

  const ageInEighteen = onlyMenInEighteen.filter(item =>
    Math.ceil(item.died / 100) === century)
    .map(item => item.died - item.born);

  return getAverageAge(ageInEighteen) || getAverageAge(onlyMen);
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
  const women = withChildren
    ? people.filter(woman => people.some(kid => kid.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const result = women.map(item => item.died - item.born);

  return getAverageAge(result);
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
  const kids = people.filter(kid =>
    people.some(mother => onlyWithSon
      ? kid.mother === mother.name && kid.sex === 'm'
      : kid.mother === mother.name));

  const result = kids.map(item =>
    item.born - people.find(women => item.mother === women.name).born);

  return getAverageAge(result);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
