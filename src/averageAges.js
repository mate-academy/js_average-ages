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

function averageAge(ages) {
  const agesSum = ages.reduce((sum, age) => sum + age, 0);

  return agesSum / ages.length || 0;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(person =>
    person.sex === 'm'
    && (century
      ? Math.ceil(person.died / 100) === century
      : true
    ));

  const mAges = men.map(man => man.died - man.born);

  return averageAge(mAges);
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
  const women = people.filter(person =>
    person.sex === 'f'
    && (withChildren
      ? people.find(child => child.mother === person.name)
      : true
    ));

  const wAges = women.map(woman => woman.died - woman.born);

  return averageAge(wAges);
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
  const children = people.filter(person =>
    (onlyWithSon
      ? person.sex === 'm'
      : true
    )
    && people.find(mother => mother.name === person.mother));

  const diffAges = children.map(child => {
    const childMother = people.find(person => person.name === child.mother);

    return child.born - childMother.born;
  });

  return averageAges(diffAges);
}

function averageAges(ages) {
  const sumAges = ages.reduce((sum, age) => sum + age, 0);

  return sumAges / ages.length || 0;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
