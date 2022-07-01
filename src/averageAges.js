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
  const withCentury = people.map((person) => ({
    ...person,
    age: (person.died - person.born),
    century: Math.ceil(person.died / 100),
  }));

  const men = withCentury.filter(person => person.sex === 'm');

  const filteredMen = century
    ? men.filter(person => person.century === century)
    : men;
  const totalAgeMen = filteredMen.reduce((sum, man) =>
    sum + man.age, 0);

  const averageAgeMen = totalAgeMen / filteredMen.length;

  return +averageAgeMen.toFixed(2);

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const withAge = people.map((person) => ({
    ...person,
    age: (person.died - person.born),
  }));
  const women = withAge.filter(person => person.sex === 'f');
  const filteredWomen = withChildren
    ? withAge.filter(person => person.sex === 'f'
    && withAge.some(child => child.mother === person.name))
    : women;

  const totalAgeWomen = filteredWomen.reduce((sum, woman) =>
    sum + woman.age, 0);
  const averageAgeWomen = totalAgeWomen / filteredWomen.length;

  return +averageAgeWomen.toFixed(2);
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
  const children = people.filter(
    child => people.some(person => child.mother === person.name));

  const filteredChildren = onlyWithSon
    ? children.filter(person => person.sex === 'm')
    : children;

  const sumAges = filteredChildren.reduce((sum, child) => sum + (child.born
    - people.find(mother => child.mother === mother.name).born), 0);

  const averageAgeDiff = sumAges / filteredChildren.length;

  return +averageAgeDiff.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
