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
  let arrayOfMen = people.filter(person => person.sex === 'm');

  arrayOfMen = century
    ? arrayOfMen.filter(men => Math.ceil(men.died / 100) === century)
    : arrayOfMen;

  const ageOfMan = arrayOfMen.map(person => person.died - person.born);

  const sumOfAge = ageOfMan.reduce((sum, age) => sum + age, 0);

  const averageAgeOfMen = sumOfAge / arrayOfMen.length;

  return averageAgeOfMen;
}

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
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
  let arrayOfWomen = people.filter(person => person.sex === 'f');

  arrayOfWomen = withChildren
    ? arrayOfWomen.filter(women =>
      people.some((person) => person.mother === women.name))
    : arrayOfWomen;

  const agesOfWomen = arrayOfWomen.map(woman => woman.died - woman.born);

  const sumOfAges = agesOfWomen.reduce((sum, age) => sum + age, 0);

  return sumOfAges / arrayOfWomen.length;
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
  let children = people.filter(child =>
    people.some(person => child.mother === person.name));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const mothers = children.map(child =>
    people.find(mother => mother.name === child.mother));

  const ageDifference = children.map((child, index) =>
    child.born - mothers[index].born);

  const sumOfDifference = ageDifference.reduce((sum, age) => sum + age, 0);

  return sumOfDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
