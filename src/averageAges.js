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
  const arrayOfMen = people.filter(({ sex, died }) => {
    return sex === 'm'
      && (century ? Math.ceil(died / 100) === century : true);
  });

  const sumOfAges = getSumOfAges(arrayOfMen);

  return sumOfAges / arrayOfMen.length;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

function getSumOfAges(array) {
  return array.reduce((acc, { born, died }) => {
    return acc + (died - born);
  }, 0);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const arrayOfWomen = people.filter(({ name, sex }) => {
    return sex === 'f'
      && (withChildren ? people.some(({ mother }) => mother === name) : true);
  });

  const sumOfAges = getSumOfAges(arrayOfWomen);

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
  const womenWithChildren = people.filter(({ name, sex }) => {
    return sex === 'f'
      && people.some(({ mother }) => mother === name);
  });

  const childrenCount = people.filter(({ sex, mother }) => {
    return womenWithChildren.some(({ name }) => {
      return name === mother
        && (onlyWithSon ? sex === 'm' : true);
    });
  });

  const totalAgeDiff = womenWithChildren.reduce((acc, { name, born }) => {
    const children = childrenCount.filter(({ mother }) => mother === name);

    const ageDiff = children.reduce((sum, child) => {
      return sum + (child.born - born);
    }, 0);

    return acc + ageDiff;
  }, 0);

  return totalAgeDiff / childrenCount.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
