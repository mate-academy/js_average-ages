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
  const menOnly = people.filter(man => !century
    ? man.sex === 'm'
    : man.sex === 'm' && Math.ceil(man.died / 100) === century);

  const ageOfAllMen = menOnly
    .reduce((total, man) => total + (man.died - man.born), 0);

  return ageOfAllMen / menOnly.length;
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
  const womenOnly = people.filter(woman => !withChildren
    ? woman.sex === 'f'
    : woman.sex === 'f' && people.some(child => child.mother === woman.name));

  const ageOfAllWomen = womenOnly
    .reduce((total, woman) => total + (woman.died - woman.born), 0);

  return ageOfAllWomen / womenOnly.length;
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
  let child = people.filter(kid => !onlyWithSon
    ? people.some(mother => mother.name === kid.mother)
    : people.some(mother => mother.name === kid.mother) && kid.sex === 'm');

  child = child.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  const ageOfAllChild = child.reduce((total, kid) => total + kid);

  return ageOfAllChild / child.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
