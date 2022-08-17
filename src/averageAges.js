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
  const eligibleMen = !century ? people.filter(person => person.sex === 'm')
    : people.filter(person => {
      const diedCentury = Math.ceil(person.died / 100);

      return person.sex === 'm' && diedCentury === century;
    });
  const eligibleMenCount = eligibleMen.length;

  return eligibleMen
    .reduce((sum, man) => sum + (man.died - man.born), 0)
       / eligibleMenCount;
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
  const eligibleWomen = !withChildren
    ? people.filter(person => person.sex === 'f')
    : people.filter(person => {
      return people.find(child => child.mother === person.name);
    });
  const eligibleWomenCount = eligibleWomen.length;

  return eligibleWomen
    .reduce((sum, woman) => sum + (woman.died - woman.born), 0)
       / eligibleWomenCount;
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
  const mothers = people
    .filter(person => people.find(child => person.name === child.mother));

  const children = !onlyWithSon
    ? people.filter(person => person.mother !== null)
    : people.filter(person => person.mother !== null && person.sex === 'm');

  let childrenCount = children.length;

  return children.reduce((sum, child) => {
    const currentMother = mothers.find(mother => child.mother === mother.name);

    if (!currentMother) {
      childrenCount--;

      return sum;
    }

    return sum + (child.born - currentMother.born);
  }, 0) / (childrenCount);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
