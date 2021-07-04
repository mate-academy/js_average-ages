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
  const onlyMen = people.filter(el =>
    (arguments.length < 2)
      ? el.sex === 'm'
      : el.sex === 'm'
    && Math.ceil(el.died / 100)
    === century);

  const averageMenAge = onlyMen.reduce((acc, men) =>
    acc + (men.died - men.born), 0) / onlyMen.length;

  return averageMenAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const onlyWomen = people.filter(el =>
    withChildren ? people.find(mom =>
      mom.mother === el.name)
      : el.sex === 'f');

  const averageWomenAge = onlyWomen.reduce((acc, women) =>
    acc + (women.died - women.born), 0) / onlyWomen.length;

  return averageWomenAge;
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
  const mother = people.filter(mom =>
    onlyWithSon ? people.some(children =>
      children.name === mom.mother)
    && mom.sex === 'm'
      : people.find(el =>
        (el.name === mom.mother)));

  const momAge = mother.map(el =>
    (el.born - people.find(person =>
      person.name === el.mother).born));

  const age = momAge.reduce((acc, element) =>
    acc + element) / momAge.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
