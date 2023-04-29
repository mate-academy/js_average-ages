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

  const menDiedInThisCentury = people.filter(person => century
    ? Math.ceil(person.died / 100) === century && person.sex === 'm'
    : person.sex === 'm');

  return +(sumOfAges(menDiedInThisCentury)
    / menDiedInThisCentury.length).toFixed(2);
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

function calculateWomenAverageAge(people, withChildren = false) {
  const women = people.filter(person => withChildren
    ? people.find(child => person.name === child.mother && person.sex === 'f')
    : person.sex === 'f');

  return +(sumOfAges(women)
    / women.length).toFixed(2);
}

function sumOfAges(people) {
  return people
    .reduce((sumAges, currentAge) =>
      sumAges + (currentAge.died - currentAge.born), 0);
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
  const children = people.filter(person => {
    const hasMother = people
      .some(possibleMother => person.mother === possibleMother.name);

    return onlyWithSon
      ? hasMother && person.sex === 'm'
      : hasMother;
  });

  const diff = children.map(child => {
    const mom = people.find(momPerson => child.mother === momPerson.name);

    return child.born - mom.born;
  });

  const averageAge = diff.reduce((sum, currentAge) => sum + currentAge, 0);

  return +(averageAge / diff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
