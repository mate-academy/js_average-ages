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
  const malesBornInCentury = people.filter(person => person.sex === 'm'
  && Math.ceil(person.died / 100) === century);

  const allMales = people.filter(person => person.sex === 'm');

  const males = century ? malesBornInCentury : allMales;

  return (males
    .reduce((sum, male) =>
      (sum + (male.died - male.born)), 0)) / males.length;
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
  const femalesWithChildren = people.filter(person =>
    person.sex === 'f' && people.some(child => child.mother === person.name));

  const allFemales = people.filter(person =>
    person.sex === 'f');

  const females = withChildren ? femalesWithChildren : allFemales;

  return females.reduce((sum, female) =>
    (sum + (female.died - female.born)), 0) / females.length;
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
  const femaleWithSon = person =>
    people.some(female => person.mother === female.name)
    && person.sex === 'm';

  const femaleWithChild = person =>
    people.some(female => person.mother === female.name);

  const isOnlyWithSon = people.filter(
    onlyWithSon ? femaleWithSon : femaleWithChild
  );

  const childBirthAge = isOnlyWithSon.map(
    child => child.born - people.find(
      mother => mother.name === child.mother).born
  );

  return (childBirthAge
    .reduce((sum, age) => sum + age, 0)) / childBirthAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
