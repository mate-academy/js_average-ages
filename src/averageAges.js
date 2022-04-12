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

const male = 'm';
const female = 'f';

function averageAgeCalc(ages) {
  return ages.reduce((a, b) => a + b, 0) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const man = people.filter(person => century
    ? person.sex === male && Math.ceil(person.died / 100) === century
    : person.sex === male
  );

  const age = man.map(person => person.died - person.born);

  return averageAgeCalc(age);
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
  const women = people.filter(person => withChildren
    ? person.sex === female && people.some(el => el.mother === person.name)
    : person.sex === female
  );

  const age = women.map(person => person.died - person.born);

  return averageAgeCalc(age);
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
  const women = people.filter(person =>
    person.sex === female && people.some(child => child.mother === person.name)
  );

  const children = people.filter(person => onlyWithSon
    ? person.sex === male
    && people.some(mother => person.mother === mother.name)
    : people.some(mother => person.mother === mother.name)
  );

  const age = children.map(child =>
    child.born - women.find(mother => mother.name === child.mother).born
  );

  return averageAgeCalc(age);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
