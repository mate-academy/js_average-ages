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
  const everageAge = people.filter(person => century
    ? (Math.ceil(person.died / 100) === century && person.sex === 'm')
    : person.sex === 'm');

  const ages = getAges(everageAge);

  return getAverage(ages);
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f');
  const ages = getAges(women);

  return getAverage(ages);
}

function getAverage(arr) {
  const summa = arr.reduce((sum, age) => sum + age, 0);
  const everage = summa / arr.length;

  return everage;
}

function getAges(arr) {
  const arrayAges = arr.map(person => person.died - person.born);

  return arrayAges;
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
  // write code here
  let children = people
    .filter(child => people
      .some(mother => child.mother === mother.name));

  children = (onlyWithSon)
    ? children.filter(child => child.sex === 'm')
    : children;

  const diffAges = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const everageDiff = diffAges.reduce((sum, age) => sum + age, 0);

  return everageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
