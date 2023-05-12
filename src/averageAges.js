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
  const man = people.filter(person => person.sex === 'm');
  const result = !century ? man
    : man.filter(person => Math.ceil(person.died / 100) === century);

  return result
    .map(person => person.died - person.born)
    .reduce((sum, life) => sum + life, 0) / result.length;
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
  const mothers = people.filter(person => person.sex === 'f');
  const result = withChildren ? people
    .filter(mom => mom.sex === 'f'
      && people.some(person => person.mother === mom.name))
    : mothers;

  return result
    .map(woman => woman.died - woman.born)
    .reduce((sum, life) => sum + life, 0) / result.length;
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
    const hasMother = people.some(person => person.name === child.mother);

    return onlyWithSon ? hasMother && child.sex === 'm' : hasMother;
  });

  return children.reduce((total, kid) => {
    const mother = people.find(mom => mom.name === kid.mother);

    return total + (kid.born - mother.born);
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
