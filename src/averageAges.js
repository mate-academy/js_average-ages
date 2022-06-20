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
const checkPersonSex = ({ sex }, checkingSex) => sex === checkingSex;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => checkPersonSex(person, 'm'));
  const menDiedInCentury = men
    .filter(person => {
      return century ? Math.ceil(person.died / 100) === century : person;
    });

  const summedAges = menDiedInCentury
    .reduce((prev, person) => prev + (person.died - person.born), 0);

  return summedAges / menDiedInCentury.length;

  // write code here
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
  // write code here
  const womanWithChildren = people.filter(person => {
    return (withChildren)
      ? checkPersonSex(person, 'f')
        && people.some(child => child.mother === person.name)
      : checkPersonSex(person, 'f');
  }
  );
  const summedAges = womanWithChildren
    .reduce((prev, person) => prev + person.died - person.born, 0);

  return summedAges / womanWithChildren.length;
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
  const children = people.filter(
    person => people.some(
      mother => mother.name === person.mother
    )
  );

  const sons = children.filter(person => checkPersonSex(person, 'm'));
  let childrenToCount = children;

  if (onlyWithSon) {
    childrenToCount = sons;
  }

  const differenceAges = childrenToCount
    .reduce((summedAges, child) => {
      const mother = people.find(
        person => person.name === child.mother);

      const differenceMomChild = child.born - mother.born;

      return summedAges + differenceMomChild;
    }, 0);

  return differenceAges / childrenToCount.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
