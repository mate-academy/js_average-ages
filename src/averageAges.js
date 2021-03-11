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
  let menList;

  if (century === undefined) {
    menList = people.filter(i => (i.sex === 'm'));
  } else {
    menList = people.filter(
      i => (i.sex === 'm' && Math.ceil(i.died / 100) === century));
  }

  const sumOfAges = menList.map(
    i => i.died - i.born).reduce((sum, i) => sum + i, 0);

  return +(sumOfAges / menList.length).toFixed(2);
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
  let womenList = [];

  if (withChildren === undefined) {
    womenList = people.filter(i => (i.sex === 'f'));
  } else {
    for (let i = 0; i < people.length; i++) {
      for (let j = 0; j < people.length; j++) {
        if (people[i].name === people[j].mother && !womenList.includes(
          people[i])) {
          womenList.push(people[i]);
        }
      }
    }
  }

  const sumOfAges = womenList.map(
    i => i.died - i.born).reduce((sum, i) => sum + i, 0);

  return +(sumOfAges / womenList.length).toFixed(2);
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
  const agesDiff = [];

  for (let i = 0; i < people.length; i++) {
    for (let j = 0; j < people.length; j++) {
      if (people[i].name === people[j].mother) {
        let ageDiff;

        if (onlyWithSon) {
          if (people[j].sex === 'm') {
            ageDiff = people[j].born - people[i].born;
            agesDiff.push(ageDiff);
          }
        } else {
          ageDiff = people[j].born - people[i].born;
          agesDiff.push(ageDiff);
        }
      }
    }
  }

  const sumOfDiff = agesDiff.reduce((sum, i) => sum + i, 0);

  return +(sumOfDiff / agesDiff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
