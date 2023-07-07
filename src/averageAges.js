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
  const men = people.filter(isAMan)
    .filter(person => getCentury(person) === century || !century);

  const totalAge = men.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return totalAge / men.length;
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
  const women = people.filter(isAWoman)
    .filter(woman => !withChildren || getMothers(people, woman).length > 0);

  const totalAge = women.reduce(
    (sum, woman) => sum + (woman.died - woman.born), 0
  );

  return totalAge / women.length;
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
  const mothers = onlyWithSon
    ? people.filter(
      person => isAMan(person)
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

// Additional functions

function getCentury(person) {
  const centuryFromYear = Math.ceil(person.died / 100);

  return centuryFromYear;
}

function isAMan(person) {
  const man = 'm';

  return person.sex === man;
}

function isAWoman(person) {
  const wooman = 'f';

  return person.sex === wooman;
}

function getMothers(people, person) {
  const isAMother = people.filter(child => child.mother === person.name);

  return isAMother;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
