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
const CENTURY = 100;
const SEX_MALE = 'm';
const SEX_FEMALE = 'f';

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const men = century
    ? people.filter(person => person.sex === SEX_MALE
      && Math.ceil(person.died / CENTURY) === century)
    : people.filter(person => person.sex === SEX_MALE);

  const menAges = calculateTotalAge(men);

  const avarageAge = calculateAvarageAge(menAges, men);

  return avarageAge;
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
  const wemen = withChildren
    ? people
      .filter((person) => person.sex === SEX_FEMALE
        && people
          .some(p => p.mother === person.name))
    : people.filter(person => person.sex === SEX_FEMALE);

  const wemenAges = calculateTotalAge(wemen);

  const avarageAge = calculateAvarageAge(wemenAges, wemen);

  return avarageAge;
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
  const children = onlyWithSon
    ? people
      .filter((person) => people
        .some(item => item.name === person.mother
          && person.sex === 'm'))
    : people
      .filter((person) => people
        .some(item => item.name === person.mother));

  const childrenAge = children
    .reduce((total, child) => total + child.born
      - people[people.findIndex(item => item.name === child.mother)]
        .born, 0);

  const avarageAge = calculateAvarageAge(childrenAge, children);

  return avarageAge;
}

function calculateTotalAge(persons) {
  const totalAge = persons
    .reduce((total, person) => total + person.died - person.born, 0);

  return totalAge;
}

function calculateAvarageAge(totalAge, persons) {
  const quantityOfPersons = persons.length.toFixed(2);

  return totalAge / quantityOfPersons;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
