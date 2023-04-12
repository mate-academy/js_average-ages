/* eslint-disable no-console */
'use strict';

function averageAge(menWomen) {
  return menWomen.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / menWomen.length;
}

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
  const men = people.filter(({ sex, died }) => (
    century
      ? century === Math.ceil(died / 100) && sex === 'm'
      : sex === 'm'
  ));

  return averageAge(men);
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
  const women = people.filter(({ sex, name }) => (
    withChildren
      ? people.some(({ mother }) => mother === name) && sex === 'f'
      : sex === 'f'
  ));

  return averageAge(women);
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
  const peopleWithMother = people.filter(person =>
    people.some(mother => (
      onlyWithSon
        ? person.sex === 'm' && mother.name === person.mother
        : mother.name === person.mother
    ))
  );

  const ageDifference = peopleWithMother.map(person => {
    const personMother = people.find(mother =>
      mother.name === person.mother);

    return person.born - personMother.born;
  });

  return ageDifference.reduce((sum, age) =>
    (sum + age), 0) / peopleWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
