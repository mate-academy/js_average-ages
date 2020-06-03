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
  let counter = 0;

  const withoutCentury = (item) => !century && item.sex === 'm';
  const withCentury = (item) => century === Math.ceil(item.died / 100)
  && item.sex === 'm';

  return people.reduce((accum, person) => {
    let newAccum = accum;

    withoutCentury(person) || withCentury(person)
      ? (newAccum += person.died - person.born) && counter++
      : newAccum = accum;

    return newAccum;
  }, 0) / counter;
}

// console.log(length)
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
  let counter = 0;

  const withoutChildren = (item) => !withChildren && item.sex === 'f';

  const withChild = (item) => withChildren
  && (item.name in archive)
  && item.sex === 'f';

  const archive = people.reduce((accum, current) => {
    let newAccum = accum;

    current.mother
      ? newAccum[current.mother] = current.name
      : newAccum = accum;

    return newAccum;
  }, {});

  return people.reduce((accum, person) => {
    let newAccum = accum;

    withoutChildren(person) || withChild(person)
      ? (newAccum += person.died - person.born) && counter++
      : newAccum = accum;

    return newAccum;
  }, 0) / counter;
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
  const archive = {};
  let counter = 0;
  const hasDaughter = (item) => !onlyWithSon && archive[item.mother];
  const hasSon = (item) => onlyWithSon
  && archive[item.mother]
  && item.sex === 'm';

  people.forEach(item => {
    archive[item.mother] = 0;
  });

  people.forEach(item => {
    if (item.name in archive) {
      archive[item.name] = item.born;
    }
  });

  return people.reduce((accum, person) => {
    let newAccum = accum;

    hasDaughter(person) || hasSon(person)
      ? (newAccum += person.born - archive[person.mother]) && counter++
      : newAccum = accum;

    return newAccum;
  }, 0) / counter;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
