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
  const filterCallback = people.filter(man => century
    ? Math.ceil(man.died / 100) === century && man.sex === 'm'
    : man.sex === 'm');
  const ages = filterCallback.map(age => age.died - age.born);

  return ages
    .reduce((sum, age) =>
      sum + age, 0) / ages.length;
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
  const filterCallback = people.filter(woman => withChildren
    ? people.some(kids =>
      kids.mother === woman.name) && woman.sex === 'f'
    : woman.sex === 'f');

  const ages = filterCallback.map(age => age.died - age.born);

  return ages.reduce(
    (sum, age) => sum + age, 0)
    / ages.length;
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
  const kids = people.filter(kid => onlyWithSon
    ? people.some(mother => mother.name === kid.mother)
    && kid.sex === 'm'
    : people.some(mother => mother.name === kid.mother));

  const resultAge = kids.map(kid => {
    const mother = people.find(mom => mom.name === kid.mother);

    return kid.born - mother.born;
  });

  return resultAge.reduce((sum, age) => sum + age, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
