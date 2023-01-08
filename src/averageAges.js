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
const calculatorAverageAge = (people) => {
  const averageAge = people.reduce((sum, age) => (
    sum + (age.died - age.born)
  ), 0) / people.length;

  return averageAge;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const menAverageAge = people.filter(person =>
    person.sex === 'm'
    && (!century || century === Math.ceil(person.died / 100)));

  return calculatorAverageAge(menAverageAge);
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
  const childrenWithMother = people.filter(person => person.mother !== null);
  const childMother = childrenWithMother.map(person => person.mother);
  const mother = people.filter(person => childMother.includes(person.name));

  const women = withChildren
    ? mother
    : people.filter(person => person.sex === 'f');

  return calculatorAverageAge(women);
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
  let childrenWithMother = people.filter(person => (
    person.mother !== null
    && people.find(mother => mother.name === person.mother)
  ));

  childrenWithMother = onlyWithSon
    ? childrenWithMother.filter(person => person.sex === 'm')
    : childrenWithMother;

  const childMother = childrenWithMother.map(person => person.mother);
  const mothers = people.filter(person => (
    childMother.includes(person.name)
  ));

  const agesDifference = childrenWithMother.map(person =>
    person.born - mothers.find(mother => person.mother === mother.name).born);
  const averageAgesDifference = agesDifference.reduce((sum, difference) => (
    sum + difference
  ), 0) / childrenWithMother.length;

  return averageAgesDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
