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

  const mailPeople = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const sumOfAges = mailPeople.reduce((prev, person) =>
    prev + person.died - person.born, 0);

  return sumOfAges / mailPeople.length;
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
  const femalePeople = withChildren === undefined
    ? people.filter(person => person.sex === 'f')
    : people.filter((person) => person.sex === 'f'
    && people.some(children => children.mother === person.name));

  const sumOfAges = femalePeople.reduce((prev, person) =>
    prev + person.died - person.born, 0);

  return sumOfAges / femalePeople.length;
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
  const childrenWithMother = people.filter(child => {
    const motherList = people.find(mother => mother.name === child.mother);

    if (onlyWithSon === undefined) {
      return motherList;
    }

    return motherList && child.sex === 'm';
  });

  const sumOfDiffAges = childrenWithMother.reduce((prev, child) => {
    const mama = people.find(mother => child.mother === mother.name);

    return prev + child.born - mama.born;
  }, 0);

  return Math.round(sumOfDiffAges * 100 / childrenWithMother.length) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
