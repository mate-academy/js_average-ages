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
  const allMen = people.filter(person => person.sex === 'm');

  const menInCentury = allMen.filter(
    (man) => Math.ceil(man.died / 100) === century
  );

  return century
    ? menInCentury.reduce(
      (acc, person) => acc + (person.died - person.born), 0
    ) / menInCentury.length

    : allMen.reduce(
      (acc, person) => acc + (person.died - person.born), 0
    ) / allMen.length;
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
  const women = people.filter(person => person.sex === 'f');
  const mothersNames = [...new Set(people
    .map(person => person.mother)
    .filter((mother) => mother !== null))];

  const mothers = women.filter(woman => mothersNames.includes(woman.name));

  return withChildren
    ? mothers.reduce(
      (acc, mother) => acc + (mother.died - mother.born), 0
    ) / mothers.length

    : women.reduce(
      (acc, woman) => acc + (woman.died - woman.born), 0
    ) / women.length;
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
  function findMother(person) {
    return people.find(p => p.name === person.mother);
  }

  const peopleWithMother = onlyWithSon
    ? people.filter(person => person.sex === 'm' && person.mother !== null)
    : people.filter(person => person.mother !== null);

  const ageDifferences = peopleWithMother.map(person => {
    const mother = findMother(person);

    return mother ? person.born - mother.born : 0;
  }).filter(dif => dif !== 0);

  const averageAgeDiff = ageDifferences
    .reduce((acc, dif) => acc + dif, 0) / ageDifferences.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
