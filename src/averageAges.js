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
  let average = 0;

  let arrayOfWomen = people.filter(function(item) {
    let valid = withChildren
      ? item['sex'] === 'f' && people.some(number => item['name'] === number['mother'])
      : item['sex'] === 'f';
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
  let amountOfChildren = 0;

  let women = people.filter(function(item) {
    let valid = item['sex'] === 'f' && people.some(function(number) {
      return onlyWithSon
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
  calculateAverageAgeDiff,
};
