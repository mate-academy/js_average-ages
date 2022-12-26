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
  let arrayMen = [];

  (century) ? arrayMen = people.filter(item =>
    Math.ceil(item.died / 100) === century && item.sex === 'm')
    : arrayMen = people.filter(item => item.sex === 'm');

  const arrayAges = arrayMen.map(item => item.died - item.born);
  const averageMenAge = arrayAges.reduce((sum, item) => sum + item, 0);

  return averageMenAge / arrayAges.length;
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
  const arrayWomen = people.filter(item => item.sex === 'f');
  let arrayMothers = [];

  if (withChildren) {
    for (let i = 0; i < arrayWomen.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (arrayWomen[i].name === people[j].mother) {
          arrayMothers.push(arrayWomen[i]);
        }
      }
    }
  } else {
    arrayMothers = arrayWomen;
  }

  const arrayAges = arrayMothers.filter((item, index) =>
    arrayMothers.indexOf(item) === index)
    .map(item => item.died - item.born);

  const averageWomenAge = arrayAges.reduce((sum, age) => sum + age, 0);

  return averageWomenAge / arrayAges.length;
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
  const arrayWomen = people.filter(item => item.sex === 'f');
  const peopleAge = [];

  if (onlyWithSon) {
    for (let i = 0; i < arrayWomen.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (arrayWomen[i].name === people[j].mother && people[j].sex === 'm') {
          peopleAge.push(people[j].born - arrayWomen[i].born);
        }
      }
    }
  } else {
    for (let i = 0; i < arrayWomen.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (arrayWomen[i].name === people[j].mother) {
          peopleAge.push(people[j].born - arrayWomen[i].born);
        }
      }
    }
  }

  const averageAge = peopleAge.reduce((sum, age) => sum + age, 0);

  return averageAge / peopleAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
