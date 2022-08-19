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

  const diedMan = people.filter(person => {
    return person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true);
  });

  return diedMan.reduce((year, man) =>
    year + (man.died - man.born), 0) / diedMan.length;
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
  const womanWithChild = people.filter(woman => {
    const hasChild = people.some(person => person.mother === woman.name);

    return (hasChild || !withChildren) && woman.sex === 'f';
  });

  const sumOfAges = womanWithChild.reduce((year, person) =>
    year + (person.died - person.born), 0);

  const averageAges = sumOfAges / womanWithChild.length;

  return averageAges;
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
  const mother = people.filter(child => {
    return people.find(woman => child.mother === woman.name)
    && (onlyWithSon ? child.sex === 'm' : true);
  });

  const diffAges = mother.reduce((year, person) => {
    const personMother = people.find(woman => person.mother === woman.name);

    return year + person.born - personMother.born;
  }, 0) / mother.length;

  return diffAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
