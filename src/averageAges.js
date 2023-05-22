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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const menAges = people.filter(person => person.sex === 'm')
    .filter(men => century !== undefined
      ? Math.ceil(men.died / 100) === century
      : true)
    .map(men => men.died - men.born);

  return menAges.reduce((m1, m2) => m1 + m2) / menAges.length;
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
  // write code here
  const womenAges = people.filter(person => person.sex === 'f')
    .filter(women => withChildren
      ? people.some(p => p.mother === women.name)
      : true)
    .map(women => women.died - women.born);

  return womenAges.reduce((w1, w2) => w1 + w2) / womenAges.length;
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
  const mothersAges = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm'
      : true;
  }).map(person => {
    const mother = people.find(p => p.name === person.mother);

    return mother === undefined ? 0 : person.born - mother.born;
  }).filter(age => age !== 0);

  return mothersAges.reduce((m1, m2) => m1 + m2) / mothersAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
