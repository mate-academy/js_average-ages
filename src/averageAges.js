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

  const menArray = (century) ? people.filter((person) => (person.sex === 'm')
    && (Math.ceil(person.died / 100) === century))
    : people.filter(person => (person.sex === 'm'));
  const menAges = menArray.map(person => person.died - person.born);
  const result = menAges.reduce((prev, current) => prev + current, 0)
    / menAges.length;

  return result;
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
  let result;
  const womenArray = people.filter(person => (person.sex === 'f'));

  if (withChildren) {
    let index = 0;
    const mothersArray = [];

    for (let i = 0; i < womenArray.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (womenArray[i].name === people[j].mother) {
          mothersArray[index] = womenArray[i];
          index++;
          break;
        }
      }
    }

    const mothersAges = mothersArray.map(person => person.died - person.born);

    result = mothersAges.reduce((prev, current) => prev + current, 0)
    / mothersAges.length;
  } else {
    const womenAges = womenArray.map(person => person.died - person.born);

    result = womenAges.reduce((prev, current) => prev + current, 0)
    / womenAges.length;
  }

  return result;
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
  const mothersArray = [];
  let index = 0;
  const womenArray = people.filter(person => (person.sex === 'f'));

  for (let i = 0; i < womenArray.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (womenArray[i].name === people[j].mother) {
        mothersArray[index] = womenArray[i];
        index++;
        break;
      }
    }
  }

  let count = 0;
  let sum = 0;

  for (let i = 0; i < mothersArray.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (mothersArray[i].name === people[j].mother) {
        if (!onlyWithSon) {
          sum += (people[j].born - mothersArray[i].born);
          count++;
        } else {
          if (people[j].sex === 'm') {
            sum += (people[j].born - mothersArray[i].born);
            count++;
          }
        }
      }
    }
  }

  const result = sum / count;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
