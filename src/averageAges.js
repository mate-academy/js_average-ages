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
  const menArr = people.filter(person => {
    return !century
      ? person.sex === 'm'
      : person.sex === 'm' && century === Math.ceil(person['died'] / 100);
  });
  const arrAge = menArr.map(year => year.died - year.born);
  const result = arrAge.reduce((manA, manB) => manA + manB);

  return result / menArr.length;
}

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
  const femaleArr = people.filter(person => {
    return !withChildren
      ? person.sex === 'f'
      : person.sex === 'f' && people.some(child => {
        return person.name === child.mother;
      });
  });
  const arrAges = femaleArr.map(year => year.died - year.born);
  const total = arrAges.reduce((ageA, ageB) => ageA + ageB);

  return total / femaleArr.length;
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
  const childArr = people.filter(person => {
    return !onlyWithSon
      ? people.some(female => female.name === person.mother)
      : person.sex === 'm' && people.some(female => {
        return female.name === person.mother;
      });
  });

  const difAges = childArr.map(child => {
    const mother = people.find(women => child.mother === women.name);

    return child.born - mother.born;
  });
  const result = difAges.reduce((ageA, ageB) => ageA + ageB);

  return result / childArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
