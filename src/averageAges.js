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
  const allMan = (person) => person.sex === 'm';

  const allManInCentury = (person) =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century;

  const man = people.filter(century ? allManInCentury : allMan);

  const averageAge = man.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / man.length;

  return averageAge;
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
  const allWoman = (person) => person.sex === 'f';

  const allWomanMother = (person) =>
    people.some(child => child.mother === person.name);

  const women = people.filter(withChildren ? allWomanMother : allWoman);

  const averageAge = women.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / women.length;

  return averageAge;
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
  const children = people.filter((child) =>
    people.some((mother) => child.mother === mother.name)
  );
  const sons = children.filter((son) => son.sex === 'm');

  const acrualArray = onlyWithSon ? sons : children;

  return acrualArray.reduce((prev, child) => {
    const motherRef = people.find((mother) => child.mother === mother.name);

    return prev + (child.born - motherRef.born);
  }, 0) / acrualArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
