'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men living in this century
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
  // replace `if ()` statement with logical operators (&&, ||) or ternary operator (?:)
  // without nesting
  let average = 0;

  let objectForCheck = people.filter(function(item) {
    let valid = (century !== undefined)
      ? (item['sex'] === 'm' && item['died'] >= ((century - 1) * 100)) && item['died'] < century * 100
      : (item['sex'] === 'm');
    if (valid) {
      average += item['died'] - item['born'];
    }
    return valid;
  });

  average = average / objectForCheck.length;

  return average;
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
  let average = 0;

  let arrayOfWomen = people.filter(function(item) {
    let valid = (!withChildren) ? item['sex'] === 'f' : item['sex'] === 'f' && people.some(function(number) {
      return (item['name'] === number['mother']);
    });
    if (valid) {
      average += item['died'] - item['born'];
    };
    return valid;
  });
  return average / arrayOfWomen.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  let amountOfChildren = 0;

  let women = people.filter(function(item) {
    let valid = item['sex'] === 'f' && people.some(function(number) {
      return (onlyWithSon)
        ? item['name'] === number['mother'] && number['sex'] === 'm'
        : item['name'] === number['mother'];
    });
    return valid;
  });

  let sumOfDiffAges = people.reduce(function(previousValue, item) {
    if (onlyWithSon && item['sex'] === 'f') return previousValue;

    let objMom = women.find(function(element) {
      return (element['name'] === item['mother']) ? element : false;
    });

    if (objMom) {
      amountOfChildren++;
      return previousValue + (item['born'] - objMom['born']);
    }
    return previousValue;
  }, 0);

  return sumOfDiffAges / amountOfChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};
