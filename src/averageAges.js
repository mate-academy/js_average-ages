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

  // ----------------- version 1
  /*
  const personFromNeededCentury = century
    ? people.filter(person => Math.ceil(people.died / 100) === century)
    : people;

  const maleOnly=personFromNeededCentury.filter(person=>person.sex === 'm');

  const totalAge = maleOnly.reduce(
    (prev, person) => prev + (person.died - person.born), 0
  );

  const averageAge = totalAge / maleOnly.length;

  return averageAge;
  */

  // ----------------- version 2

  const men = people.filter(person => person.sex === 'm')
    .filter(person => getCentury(person) === century || !century);

  const totalAge = men.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return totalAge / men.length;
}

function getCentury(person) {
  return Math.ceil(person.died / 100);
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

  const women = people.filter(person => person.sex === 'f')
    .filter(woman => !withChildren || hasChildren(people, woman).length > 0);

  const totalAge = women.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0
  );

  return totalAge / women.length;
}

function hasChildren(people, person) {
  return people.filter(child => child.mother === person.name);
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

  const mothers = onlyWithSon
    ? people.filter(
      person => person.sex === 'm'
        && people.some(child => person.mother === child.name)
    )
    : people.filter(
      person => people.some(child => person.mother === child.name)
    );

  const ageDifference = mothers.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const totalAge = ageDifference.reduce((sum, diff) => sum + diff, 0);

  return totalAge / mothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
