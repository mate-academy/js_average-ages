'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of personson's death by 100: Math.ceil(personson.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function averageAge(persons) {
  return persons.map(person => person.died - person.born)
    .reduce((firstperson, secondperson) =>
      firstperson + secondperson) / persons.length;
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const everyMan = people.filter(person => person.sex === 'm');
  const thisCenturyPeople = people.filter(person =>
    Math.ceil(person.died / 100) === century
    && person.sex === 'm');

  return (century === undefined)
    ? averageAge(everyMan)
    : averageAge(thisCenturyPeople);
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
  const everyWomen = people.filter(person =>
    person.sex === 'f');
  const womenWithChildren = people.filter(woman =>
    people.some(person => person.mother === woman.name));

  return (withChildren === undefined)
    ? averageAge(everyWomen)
    : averageAge(womenWithChildren);
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
  const children = people.filter(person =>
    (onlyWithSon !== undefined)
      ? people.find(woman => woman.name === person.mother)
        && person.sex === 'm'
      : people.find(woman => woman.name === person.mother)
  );

  return children.reduce((prev, current) =>
    (prev + current.born - people.find(person =>
      (person.name === current.mother)).born), 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
