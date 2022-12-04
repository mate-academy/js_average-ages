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
  const menOnly = (century)
    ? people.filter(man => (man.sex === 'm'
    && Math.ceil(man.died / 100) === century))
    : people.filter(man => (man.sex === 'm'));
    /*
    if century is valid, only those men added to the array,
    whos died in the given century
    */

  const calcAges = menOnly.map(man => man.died - man.born);
  const menAvg = calcAges.reduce((total, age) => (total + age));

  return menAvg / calcAges.length;
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
  const mothers = people.map(eachPerson => eachPerson['mother']);
  const womenOnly = (withChildren)
    ? people.filter(woman => woman.sex === 'f' && mothers.includes(woman.name))
    : people.filter(woman => woman.sex === 'f');
    /**
     * when withChildren is valid, it checks if a person is a mother
     */
  const calcAges = womenOnly.map(woman => woman.died - woman.born);
  const womenAgeSum = calcAges.reduce((total, age) => (total + age));

  return womenAgeSum / calcAges.length;
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
  const personsToCheck = (onlyWithSon)
    ? people.filter(person => person.sex === 'm')
    : people;

  function calcMotherChildDiff(obj) {
    const motherId = people.findIndex(mother => mother.name === obj.mother);

    if (motherId > -1) {
      return obj.born - people[motherId].born;
    }
  }

  const ageDiffAll = personsToCheck.map(person => calcMotherChildDiff(person));
  /**
   * ageDiffAll have some undefined values,
   * when mother is not listed in 'people'.
   * validAgeDiff solve this problem.
   */
  const validAgeDiff = ageDiffAll.filter(age => age);

  return (validAgeDiff.reduce((total, age) =>
    total + age)) / validAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
