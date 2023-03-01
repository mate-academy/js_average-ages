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
  const filteredMen = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const manAges = filteredMen.map(person => person.died - person.born);

  const averageSumm = manAges.reduce((a, b) => a + b, 0) / manAges.length;

  return averageSumm;
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
  const womens = withChildren
    ? people.filter(woman =>
      (people.some(child => woman.name === child.mother)))
    : people.filter((woman) => woman.sex === 'f');

  const age = womens.map((years) => years.died - years.born);

  const averageSumm = age.reduce((sum, years) => sum + years, 0) / age.length;

  return averageSumm;
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.find(mother => mother.name === child.mother)
      && child.sex === 'm'
      : people.find(mother => mother.name === child.mother)
  );

  const ageDifferences = children.reduce((ageSum, child) => {
    const motherBorn = people.find(mother => mother.name === child.mother).born;

    return ageSum + (child.born - motherBorn);
  }, 0);

  return ageDifferences / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
