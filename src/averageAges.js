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
  const getMen = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');
  const getAge = getMen.map(person => person.died - person.born);
  const averageAge = getAge.reduce((sum, age) => sum + age, 0) / getMen.length;

  return averageAge;
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
  const getWomen = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(one => one.mother === person.name)
    : person.sex === 'f');
  const getAge = getWomen.map(person => person.died - person.born);
  const averageAge = getAge.reduce((sum, age) => sum + age, 0)
    / getWomen.length;

  return averageAge;
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
  // write code here
  const agesDiff = people
    .map((person) => {
      const child = person.mother ? person : null;
      const son = child && child.sex === 'm' ? child : null;
      const mother = child
        ? people.find((one) => one.name === child.mother)
        : null;
      const motherWithSon = son
        ? people.find((one) => one.name === son.mother)
        : null;

      if (onlyWithSon) {
        return motherWithSon ? son.born - mother.born : null;
      }

      return mother ? child.born - mother.born : null;
    })
    .filter(age => age !== null);

  const averageAgeDiff = agesDiff
    .reduce((sum, age) => sum + age, 0)
    / agesDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
