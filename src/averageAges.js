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
  let mansArr = [];

  century
    ? mansArr = people.filter((item) => item.sex === 'm'
      && Math.ceil(item.died / 100) === century)
    : mansArr = people.filter((item) => item.sex === 'm');

  const sumAge = mansArr.reduce(function(accum, b) {
    return accum + (b.died - b.born);
  }, 0);

  return sumAge / mansArr.length;
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
  const womenArr = people.filter(function(item) {
    return item.sex === 'f';
  });

  const motherArr = people.filter(function(item, id, arr) {
    return item.sex === 'f' && arr.some(function(person) {
      return item.name === person.mother;
    });
  });

  function calcAverage(arr) {
    return arr.reduce(function(accum, b) {
      return accum + (b.died - b.born);
    }, 0) / arr.length;
  }

  return withChildren ? calcAverage(motherArr) : calcAverage(womenArr);
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
  const motherArr = people.filter(function(item, id, arr) {
    return item.sex === 'f' && arr.some(function(person) {
      return item.name === person.mother;
    });
  });

  const diffAgesArr = motherArr.map(function(mother) {
    const diffArr = [];
    const children = people.filter(function(item) {
      if (onlyWithSon) {
        return mother.name === item.mother && item.sex === 'm';
      } else {
        return mother.name === item.mother;
      }
    });

    for (let i = 0; i < children.length; i++) {
      diffArr.push(children[i].born - mother.born);
    }

    return diffArr;
  });

  const resArr = diffAgesArr.reduce(function(a, b) {
    return a.concat(b);
  });

  function calcAverage(arr) {
    return arr.reduce((a, b) => a + b) / arr.length;
  }

  return calcAverage(resArr);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
