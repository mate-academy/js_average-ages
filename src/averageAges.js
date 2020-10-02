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
  let filteredPeople = people.filter(({ sex }) => sex === 'm');

  if (century) {
    filteredPeople = filteredPeople.filter(({ died }) => {
      return century === Math.ceil(died / 100);
    });
  };

  const sumOfAges = filteredPeople.reduce((sum, { died, born }) => {
    return sum + (died - born);
  }, 0);

  return sumOfAges / filteredPeople.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  let filteredPeople = people.filter(({ sex }) => sex === 'f');

  if (withChildren) {
    filteredPeople = filteredPeople.filter(({ name }) => {
      return people.some(child => child.mother === name);
    });
  };

  const sumOfAges = filteredPeople.reduce((sum, { died, born }) => {
    return sum + (died - born);
  }, 0);

  return sumOfAges / filteredPeople.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiff = [];
  let mothers = people.filter(person =>
    person.sex === 'f' && people.some(child => {
      return child.mother === person.name;
    }));

  if (onlyWithSon) {
    mothers = mothers.filter(mother =>
      people.some(child => child.mother === mother.name && child.sex === 'm'));
  }

  mothers.map(mother => {
    const children = onlyWithSon
      ? people.filter(child =>
        child.mother === mother.name && child.sex === 'm')
      : people.filter(child => child.mother === mother.name);

    children.map(child => ageDiff.push(child.born - mother.born));
  });

  return ageDiff.reduce((sum, age) => sum + age, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
