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
  const menAges = people.filter((person) => {
    const deathCentury = Math.ceil(person.died / 100);

    return century !== undefined
      ? deathCentury === century && person.sex === 'm'
      : person.sex === 'm';
  }).map(person => person.died - person.born);

  return menAges.reduce((sum, age) => sum + age, 0) / menAges.length;
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
  const womenAges = people.filter((person) => {
    const isMother = people
      .find(otherPerson => otherPerson.mother === person.name) !== undefined;

    return person.sex === 'f' && (!withChildren || isMother);
  }).map(person => person.died - person.born);

  return womenAges.reduce((sum, age) => sum + age, 0) / womenAges.length;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const mothers = people.filter(
    person => people.some(
      otherPerson => otherPerson.mother === person.name
    )
  );

  const filteredPeople = people.filter(
    person => mothers.some(
      mother => mother.name === person.mother
    ) && (!onlyWithSon || person.sex === 'm')
  );

  const sumOfAgeDiffs = filteredPeople.reduce((sum, person) => {
    const motherOfPerson = mothers.find(
      mother => mother.name === person.mother
    );
    const ageDifference = person.born - motherOfPerson.born;

    return sum + ageDifference;
  }, 0);

  return sumOfAgeDiffs / filteredPeople.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
