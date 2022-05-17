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
  const sexM = people.filter(person =>
    century
      ? person.sex === 'm' && century === Math.ceil(person.died / 100)
      : person.sex === 'm');

  // const sexM = people.filter(person => person.sex === 'm');
  // [{…}, {…}, {…}, {…}, ]
  const arrOfAges = sexM.map(man => (man.died - man.born));
  // [73, 34, 90, 72, 47]
  const sumOfAges = arrOfAges.reduce((sum, age) => sum + age, 0); // 1295
  const averageAge = sumOfAges / arrOfAges.length; // 61.666 (62)

  return averageAge;
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
//  { 'name': 'Carolus Haverbeke', 'sex': 'm',
// 'born': 1832, 'died': 1905,
// 'father': 'Carel Haverbeke',
// 'mother': 'Maria van Brussel' }
function calculateWomenAverageAge(people, withChildren) {
  const hasChildren = people.filter(person =>
    withChildren
      ? people.some(el => el.mother === person.name)
      : person.sex === 'f');

  const arrOfAges = hasChildren.map(woman => (woman.died - woman.born));
  // [73, 34, 90, 72, 47]
  const sumOfAges = arrOfAges.reduce((sum, age) => sum + age, 0); // 1295
  const averageAge = sumOfAges / arrOfAges.length; // 61.666 (62)

  return averageAge;

  // return hasChildren;
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.some(mom => child.mother === mom.name && child.sex === 'm')
      : people.some(mom => child.mother === mom.name));

  const arrOfAvarageAges = children.map(child => {
    const mother = people.find(mom => child.mother === mom.name);

    return child.born - mother.born;
  });
  // [31, 31, 42, 38, 28, 36, 22, 39, 28, 29, 20, 24, 29, 39, 27, 35, 39, 25]

  const sumOfAges = arrOfAvarageAges.reduce((sum, age) => sum + age, 0);
  // 562

  const averageAge = sumOfAges / arrOfAvarageAges.length;
  // 31.22222222222222

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
