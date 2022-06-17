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
function getPeopleBySex(people, sex) {
  return people.filter((person) => person.sex === sex);
}

function calculateMenAverageAge(people, century) {
  const menAll = getPeopleBySex(people, 'm');
  const menWithCentury = menAll
    .filter((person) => Math.ceil(person.died / 100) === century);

  const menForCalculate = century ? menWithCentury : menAll;

  const menAverageAge = Math.ceil(menForCalculate
    .map((person) => person.died - person.born)
    .reduce((sum, item) => sum + item) / menForCalculate.length * 100) / 100;

  return menAverageAge;
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
  const womenAll = getPeopleBySex(people, 'f');
  const womenWithChildren = womenAll
    .filter(mother => people
      .some(child => mother.name === child.mother));

  const womenForCalculate = withChildren ? womenWithChildren : womenAll;

  const womenAverageAge = womenForCalculate
    .map(person => person.died - person.born)
    .reduce((agesPerson1, agesPerson2) => agesPerson1 + agesPerson2)
    / womenForCalculate.length;

  return womenAverageAge;
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
  const children = people.filter(person =>
    people.some(mother => person.mother === mother.name)
  );
  const childIsBoys = getPeopleBySex(children, 'm');

  const childrenForCalculate = onlyWithSon ? childIsBoys : children;

  const averageAgeDiff = childrenForCalculate
    .reduce((sum, child) => sum + (child.born - people
      .find(mother => child.mother === mother.name).born), 0)
      / childrenForCalculate.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
