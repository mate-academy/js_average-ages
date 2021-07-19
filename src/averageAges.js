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
  const men = people.filter(person => person.sex === 'm');
  const mappedMen = century
    ? men.filter(person =>
      Math.ceil(person.died / 100) === century).map(person =>
      person.died - person.born)
    : men.map(person => person.died - person.born);
  const averageAgeOfMen = mappedMen.reduce((sum, current) => sum + current, 0);

  return averageAgeOfMen / mappedMen.length;
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
  const women = people.filter(person => person.sex === 'f');
  const mappedWomen = withChildren
    && withChildren ? women.filter(person => people.find(element =>
      element.mother === person.name)).map(person => person.died - person.born)
    : women.map(person => person.died - person.born);
  const averageAge = mappedWomen.reduce((sum, current) => sum + current, 0);

  return averageAge / mappedWomen.length;
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
  const women = people.filter(person => person.sex === 'f');
  const men = people.filter(person => person.sex === 'm');
  const children = onlyWithSon
    ? men.filter(child =>
      women.find(mother => mother.name === child.mother))
    : people.filter(child => people.find(mother =>
      mother.name === child.mother));
  const ageDiff = children.map(child =>
    child.born - women.find(mother => mother.name === child.mother).born);
  const averageAge = ageDiff.reduce((sum, age) => sum + age, 0);

  return averageAge / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
