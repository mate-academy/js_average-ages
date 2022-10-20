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
// function calculateMenAverageAge(people, century) {
// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

const calculateAverageAge = (people) => {
  const sumOfAges
      = people.reduce((sum, person) => sum + (person.died - person.born), 0);

  return sumOfAges / people.length;
};

function calculateMenAverageAge(people, century) {
  const men = (century)
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  return calculateAverageAge(men);
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
  const women = (withChildren)
    ? people.filter(person =>
      person.sex === 'f'
      && people.some(kid => kid.mother === person.name))
    : people.filter(person => person.sex === 'f');

  return calculateAverageAge(women);
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
  const allKids = (onlyWithSon)
    ? people.filter(kid =>
      kid.sex === 'm'
      && people.some(mother => kid.mother === mother.name))
    : people.filter(kid =>
      people.some(mother => kid.mother === mother.name));

  const diffAges = allKids.map(kid => {
    const mother = people.find(mom => kid.mother === mom.name);

    return kid.born - mother.born;
  });

  return diffAges.reduce((sum, age) => sum + age, 0) / diffAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
