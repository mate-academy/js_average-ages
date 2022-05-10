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
  const filterDiedOfCentury = (yearOfDied, curentCentury) => {
    const centuryOfDied = Math.ceil(yearOfDied / 100);

    return curentCentury === centuryOfDied;
  };

  const onlyMen = century === undefined
    ? people.filter((person) => person.sex === 'm')
    : people.filter((person) =>
      person.sex === 'm' && filterDiedOfCentury(person.died, century));

  return onlyMen.reduce((sum, man) =>
    sum + man.died - man.born, 0) / onlyMen.length;
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
  const women = people.filter((person) =>
    person.sex === 'f' && (withChildren !== undefined
      ? people.some((child) => child.mother === person.name)
      : true));

  return women.reduce((sum, woman) =>
    sum + woman.died - woman.born, 0) / women.length;
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
  const childHasMother = (child) =>
    people.some((mother) => child.mother === mother.name);
  const sonHasMother = (child) =>
    people.some((mother) => child.mother === mother.name && child.sex === 'm');

  const childrenWithMother = people.filter((child) =>
    onlyWithSon ? sonHasMother(child) : childHasMother(child));

  const sumOfDiferenceAge = childrenWithMother.reduce((sum, child) =>
    sum + (((child.born - people.find((mother) =>
      child.mother === mother.name).born)) || 0), 0);

  return (sumOfDiferenceAge / childrenWithMother.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
