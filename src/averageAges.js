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

  const withoutCentury = (person) => !century && person.sex === 'm';
  const withCentury = (person) => century === Math.ceil(person.died / 100)
  && person.sex === 'm';

  return people.reduce((accum, person) => {
    let newAccum = accum;

    (withoutCentury(person) || withCentury(person))
      && ((newAccum += person.died - person.born) && counter++);

    return newAccum;
  }, 0) / counter;
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
  let counter = 0;

  const withoutChildren = (person) => !withChildren && person.sex === 'f';

  const withChild = (person) => withChildren
  && (person.name in archive)
  && person.sex === 'f';

  const archive = people.reduce((accum, current) => {
    const newAccum = accum;

    (current.mother) && (newAccum[current.mother] = current.name);

    return newAccum;
  }, {});

  return people.reduce((accum, person) => {
    let newAccum = accum;

    (withoutChildren(person) || withChild(person))
      && (newAccum += person.died - person.born) && counter++;

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
  const hasDaughter = (person) => !onlyWithSon && archive[person.mother];
  const hasSon = (person) => onlyWithSon
  && archive[person.mother]
  && person.sex === 'm';

  people.forEach(item => {
    archive[item.mother] = 0;
  });

  people.forEach(item => {
    if (item.name in archive) {
      archive[item.name] = item.born;
    }
  });

  return people.reduce((accum, person, index) => {
    let newAccum = accum;

    (hasDaughter(person) || hasSon(person))
      && ((newAccum += person.born - archive[person.mother]) && counter++);

    return newAccum;
  }, 0) / counter;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
