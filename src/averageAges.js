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
  function agesMen(element) {
    const x = element.sex === 'm' && Math.ceil(element.died / 100) === century;
    const y = element.sex === 'm';

    return (century !== undefined) ? x : y;
  }

  const arrMen = people.filter(agesMen);

  const sumAges = arrMen.map(item => item.died - item.born);
  const averageAges = sumAges.reduce((sum, x) => sum + x, 0) / arrMen.length;

  return averageAges;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  function isMother(item, index, arr) {
    let x = false;

    for (const key of arr) {
      if (item.name === key.mother) {
        x = true;
        break;
      };
    }

    return x;
  };

  let women = [];

  if (withChildren === true) {
    women = people.filter(isMother);
  } else {
    women = people.filter(x => x.sex === 'f');
  };

  const sumAges = women.map(i => i.died - i.born);
  const averageWomenAge = sumAges.reduce((sum, x) => sum + x, 0) / women.length;

  return averageWomenAge;
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
  function isMother(item, index, arr) {
    const ages = [];

    for (const key of arr) {
      if (onlyWithSon === true) {
        if (item.name === key.mother && key.sex === 'm') {
          const x = key.born - item.born;

          ages.push(x);
        };
      } else {
        if (item.name === key.mother) {
          const x = key.born - item.born;

          ages.push(x);
        };
      };
    }

    return ages;
  };

  const result = people.map(isMother).filter(x => x.length > 0);
  let sum = 0;
  let count = 0;

  for (const key of result) {
    for (const y of key) {
      sum += y;
      count++;
    }
  };

  const average = sum / count;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
