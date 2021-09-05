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
  const menAllCentury = people.filter(item => item['sex'] === 'm');
  const allMen = (arguments.length < 2) ? menAllCentury
    : menAllCentury.filter(item => {
      return (Math.ceil(item['died'] / 100) === century);
    });

  const allAges = allMen.reduce((value, item) => {
    const ageDeath = item['died'] - item['born'];

    return (ageDeath + value);
  }, 0);
  const averageAge = allAges / allMen.length;

  return averageAge;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const allWomen = people.filter(item => item['sex'] === 'f');
  const allWomenResult = (arguments.length < 2) ? allWomen
    : allWomen.filter(item => {
      return (people.some(element => element['mother'] === item['name']));
    });

  const allAges = allWomenResult.reduce((value, item) => {
    const ageDeath = item['died'] - item['born'];

    return (ageDeath + value);
  }, 0);
  const averageAge = allAges / allWomenResult.length;

  return averageAge;
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
  const childAll = people.filter(item => {
    return (people.some(element => element['name'] === item['mother']));
  });
  const child = (arguments.length < 2) ? childAll
    : childAll.filter(item => {
      return (item['sex'] === 'm');
    });
  const allAges = child.reduce((value = 0, item) => {
    const thisMother = people.find(element => {
      return (element['name'] === item['mother']);
    });
    const ageAtBirth = item['born'] - thisMother['born'];

    return (ageAtBirth + value);
  }, 0);

  return (allAges / child.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
