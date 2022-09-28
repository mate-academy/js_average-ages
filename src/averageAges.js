'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of human's death by 100: Math.ceil(human.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function averageAge(people) {

  const ages = people.map(person => person.died - person.born)
    .reduce((sum, current) => sum + current, 0);

  const averageAgeTotal = ages / people.length;

  return averageAgeTotal;
}

function calculateMenAverageAge(people, century = true) {
  const allMens = people.filter(human => human.sex === 'm');

  const centuryAgesMens = allMens.filter(human =>
    Math.ceil(human.died / 100) === century || century === true);

  return averageAge(centuryAgesMens);
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
function calculateWomenAverageAge(people, withChildren = false) {
  const allWomens = people.filter(human => human.sex === 'f');

  const ageWomens = withChildren
    ? allWomens.filter(human => people
      .find(child => child.mother === human.name))
    : allWomens;

  return averageAge(ageWomens);
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
  let children = people.filter(child => child.mother
    && people.find(human => human.name === child.mother));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ages = children.map(child => child.born
    - people.find(human => human.name === child.mother).born);

  const sumOfAges = ages.reduce((sum, age) => sum + age, 0);
  const averageAgeDiff = sumOfAges / ages.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
