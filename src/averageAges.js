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
  const men = (century)
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const TotalMenAge = men.reduce((prev, current) => {
    const sum = prev + current.died - current.born;

    return sum;
  }, 0);

  return TotalMenAge / men.length;
}

/**
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
  const women = (withChildren)
    ? people
      .filter(woman => (
        people.find(person => woman.name === person.mother)
      ))
    : people.filter(person => person.sex === 'f');

  const TotalWomenAge = women.reduce((prev, current) => {
    const sum = prev + current.died - current.born;

    return sum;
  }, 0);

  return TotalWomenAge / women.length;
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
  const children = people.filter(child => {
    return people.find(person => person.name === child.mother);
  });

  const onlySons = (onlyWithSon)
    ? children.filter(person => person.sex === 'm')
    : children;

  const sumDifference = onlySons.reduce((prev, child) => {
    const motherAgeAtBirth = people
      .find(person => person.name === child.mother).born;
    const sum = prev + child.born - motherAgeAtBirth;

    return sum;
  }, 0);

  return sumDifference / onlySons.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
