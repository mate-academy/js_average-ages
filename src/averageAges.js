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

  const men = century
    ? people.filter(person => ((Math.ceil(person.died / 100))
      === century && person.sex === 'm'))
    : people.filter(person => person.sex === 'm');

  const averegeAges = men
    .map(person => person.died - person.born)
    .reduce((acc, age) => acc + age, 0) / men.length;

  return averegeAges;
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
    ? people.filter(mom => people.some(child => child.mother === mom.name))
    : people.filter(woman => woman.sex === 'f');

  const averegeAgesWomen = women
    .map(person => person.died - person.born)
    .reduce((acc, age) => acc + age, 0) / women.length;

  return averegeAgesWomen;
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
  const children = onlyWithSon
    ? people.filter(child => people.some(mom => child.mother === mom.name
      && child.sex === 'm'))
    : people.filter(child => people.some(mom => child.mother === mom.name));

  const totalAges = children.reduce((acc, child) => {
    const mother = people.find(mom => child.mother === mom.name);

    const ageDiff = child.born - mother.born;

    return acc + ageDiff;
  }, 0);

  return totalAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
