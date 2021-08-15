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
  let calculateMen = people.filter(person => person.sex === 'm');

  calculateMen = century

    ? calculateMen.filter(men => Math.ceil(men.died / 100) === century
    ) : calculateMen;

  const menAverageAge = calculateMen.reduce((total, { born, died }) =>
    total + (died - born), 0);

  return menAverageAge / calculateMen.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let calculateWoman = people.filter(person => person.sex === 'f');

  calculateWoman = withChildren

    ? calculateWoman.filter(women => people.some(person =>
      person.mother === women.name)
    ) : calculateWoman;

  const womenAverageAge = calculateWoman.reduce(
    (total, { born, died }) => total + (died - born), 0);

  return womenAverageAge / calculateWoman.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleChild = onlyWithSon

    ? people.filter(child => child.sex === 'm'
      && people.some(women => women.name === child.mother))
    : people.filter(child => (
      people.some(woman => woman.name === child.mother)
    ));

  const ageDiff = peopleChild.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return ageDiff.reduce((total, age) =>
    total + age) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
