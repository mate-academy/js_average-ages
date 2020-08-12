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
  let average;
  let man;

  if (century !== undefined) {
    man = people.filter(x => x.sex === 'm'
    && Math.floor(x.died / 100) + 1 === century);
    average = man.reduce((sum, x) => sum + (x.died - x.born), 0);

    return average / man.length;
  } else {
    man = people.filter(x => x.sex === 'm');
    average = man.reduce((sum, x) => sum + (x.died - x.born), 0);

    return average / man.length;
  }

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let average;
  let woman;

  if (withChildren) {
    woman = people.filter(x => x.sex === 'f');

    const mother = woman.filter(x => people.find(
      a => a.mother === x.name));

    average = mother.reduce((sum, x) => sum + (x.died - x.born), 0);

    return average / mother.length;
  } else {
    woman = people.filter(x => x.sex === 'f');
    average = woman.reduce((sum, x) => sum + (x.died - x.born), 0);

    return average / woman.length;
  }
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
  const between = [];

  if (onlyWithSon) {
    people.filter(x => x.sex === 'f').filter(x =>
      people.filter(a => {
        if (x.name === a.mother && a.sex === 'm') {
          between.push(a.born - x.born);
        }
      }));

    const average = between.reduce((sum, x) => sum + x, 0);

    return average / between.length;
  } else {
    people.filter(x => x.sex === 'f').filter(x =>
      people.filter(a => {
        if (x.name === a.mother) {
          between.push(a.born - x.born);
        }
      }));

    const average = between.reduce((sum, x) => sum + x, 0);

    return average / between.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
