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
  const men = century
    ? people.filter((person) => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    })
    : people.filter((person) => person.sex === 'm');

  const ages = men.map((person) => person.died - person.born);
  const sumOfAge = ages.reduce((sum, age) => sum + age, 0);

  return sumOfAge / ages.length;
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
    ? people.filter(woman => people.some(child => child.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const ages = women.map((woman) => woman.died - woman.born);
  const sumOfAge = ages.reduce((sum, age) => sum + age, 0);

  return sumOfAge / ages.length;
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
  const children = (onlyWithSon)
    ? people.filter((child) => {
      return people.some((woman) => {
        return ((child.mother === woman.name) && (child.sex === 'm'));
      });
    })
    : people.filter(child => {
      return people.some(woman => child.mother === woman.name);
    });

  const callback = (sum, child) => {
    const mother = people.find((person) => {
      return child.mother === person.name;
    });

    const add = child.born - mother.born;

    return sum + add;
  };

  const sumOfAges = children.reduce(callback, 0);

  return sumOfAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
