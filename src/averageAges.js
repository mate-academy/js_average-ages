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
  const menBornInCentury = people.filter(person => person.sex === 'm'
  && Math.ceil(person.died / 100) === century);

  const allMen = people.filter(person => person.sex === 'm');

  const men = (typeof (century) === 'undefined') ? allMen : menBornInCentury;

  return +((men
    .reduce((sum, man) =>
      (sum + (man.died - man.born)), 0)) / men.length).toFixed(2);
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
  const allWomen = people.filter(person => person.sex === 'f');
  const womenWithCildren = people.filter(person =>
    person.sex === 'f' && people.some(child => child.mother === person.name));

  const women = withChildren ? womenWithCildren : allWomen;

  return +(women.reduce((sum, woman) =>
    (sum + (woman.died - woman.born)), 0) / women.length).toFixed(2);
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

  return +((childBirthAge
    .reduce((sum, age) => sum + age, 0)) / childBirthAge.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
