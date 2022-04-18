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
function calculateMenAverageAge(people, century = 0) {
  const copyOfMan = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const copyOfManLength = copyOfMan.length;

  return (copyOfMan.reduce((sum, man) => {
    return sum + (man.died - man.born);
  }, 0)) / copyOfManLength;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const womenWithChildren = people.filter((person) => withChildren
    ? person.sex === 'f' && people.some((child) => child.mother === person.name)
    : person.sex === 'f'
  );

  const womenWithChildrenLength = womenWithChildren.length;

  return (womenWithChildren.reduce((sum, man) => {
    return sum + (man.died - man.born);
  }, 0)) / womenWithChildrenLength;
}

/**
   * Implement calculateAverageAgeDiff function.
   *
   * The function returns an average
 * age difference between a child and his or her
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const getPeopleWithMother = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm' && people.some(woman => woman.name === person.mother)
      : people.some(woman => woman.name === person.mother);
  });

  const agesDiff = getPeopleWithMother.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return (child.born - mother.born);
  });

  return agesDiff.reduce((sum, man) => sum + man, 0) / agesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
