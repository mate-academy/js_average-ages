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
function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(person => person.sex === 'm');

  const checkArrOfMen = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const sumOfAgesOfMen = checkArrOfMen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumOfAgesOfMen / checkArrOfMen.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter(person => person.sex === 'f');

  const checkArrOfWomen = withChildren
    ? women.filter(mother =>
      people.find(person => person.mother === mother.name))
    : women;

  const sumOfAgesOfWomen = checkArrOfWomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0);

  return sumOfAgesOfWomen / checkArrOfWomen.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let children = people.filter(person =>
    people.find(mother => mother.name === person.mother));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const diffAges = children.map(child => {
    const mother = people.find(person => child.mother === person.name);

    return child.born - mother.born;
  });

  const sumOfDiffAges = diffAges.reduce((sum, age) => sum + age, 0);

  return sumOfDiffAges / diffAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
