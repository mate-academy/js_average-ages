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
  let countAgesSum = [];

  if (!century) {
    countAgesSum = people.reduce((prev, element) => {
      let [count, countAges] = prev;

      if (element.sex === 'm') {
        count++;
        countAges += element.died - element.born;
      }

      return [count, countAges];
    }, [0, 0]);
  }

  if (century) {
    countAgesSum = people.reduce((prev, element) => {
      let [count, countAges] = prev;

      if (element.sex === 'm' && Math.ceil(element.died / 100) === century) {
        count++;
        countAges += element.died - element.born;
      }

      return [count, countAges];
    }, [0, 0]);
  }

  return countAgesSum[1] / countAgesSum[0];
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
  // write code here
  let countAgesSum = [];

  if (!withChildren) {
    countAgesSum = people.reduce((prev, element) => {
      let [count, countAges] = prev;

      if (element.sex === 'f') {
        count++;
        countAges += element.died - element.born;
      }

      return [count, countAges];
    }, [0, 0]);
  }

  if (withChildren) {
    countAgesSum = people.reduce((prev, element) => {
      let [count, countAges] = prev;

      if ((people.some(el => element.name === el.mother))) {
        count++;
        countAges += element.died - element.born;
      }

      return [count, countAges];
    }, [0, 0]);
  }

  return countAgesSum[1] / countAgesSum[0];
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
  // write code here
  let countAgesSum = [];

  if (!onlyWithSon) {
    countAgesSum = people.reduce((prev, mother) => {
      let [count, countAges] = prev;
      const children = people.filter(child => mother.name === child.mother);

      if (children.length > 0) {
        countAges += children.reduce((sum, child) => {
          let sumAgesForEveryChild = sum;

          sumAgesForEveryChild += child.born - mother.born;

          return sumAgesForEveryChild;
        }, 0);
      }

      count += children.length;

      return [count, countAges];
    }, [0, 0]);
  }

  if (onlyWithSon) {
    countAgesSum = people.reduce((prev, mother) => {
      let [count, countAges] = prev;
      const children = people.filter(child => mother.name === child.mother
        && child.sex === 'm');

      if (children.length > 0) {
        countAges += children.reduce((sum, child) => {
          let sumAgesForEveryChild = sum;

          sumAgesForEveryChild += child.born - mother.born;

          return sumAgesForEveryChild;
        }, 0);
      }

      count += children.length;

      return [count, countAges];
    }, [0, 0]);
  }

  return countAgesSum[1] / countAgesSum[0];
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
