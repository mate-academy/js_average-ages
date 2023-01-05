'use strict';

function calculateAverageAge(people) {
  return people.reduce((sum, age) =>
    sum + (age.died - age.born), 0) / people.length;
}

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
  let filteredMen = people.filter(person => person.sex === 'm');

  filteredMen = century
    ? filteredMen.filter(men => Math.ceil(men.died / 100) === century)
    : filteredMen;

  return calculateAverageAge(filteredMen);
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
  let filteredWomen = people.filter(person => person.sex === 'f');

  filteredWomen = withChildren
    ? filteredWomen.filter(women =>
      people.some((person) => person.mother === women.name))
    : filteredWomen;

  return calculateAverageAge(filteredWomen);
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
  let filteredChildren = people.filter(child =>
    people.some(person => child.mother === person.name));

  filteredChildren = onlyWithSon
    ? filteredChildren.filter(child => child.sex === 'm')
    : filteredChildren;

  const mothers = filteredChildren.map(child =>
    people.find(mother => mother.name === child.mother));

  const ageDifferences = filteredChildren.map((child, index) =>
    child.born - mothers[index].born);

  const sumOfDifferences = ageDifferences.reduce((sum, age) => sum + age, 0);

  return sumOfDifferences / filteredChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
