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
  const identifyMen = people.filter((person) =>
    person.sex === 'm' && (century
      ? Math.ceil(person.died / 100) === century : true));

  return identifyMen.reduce((sum, man) =>
    sum + man.died - man.born, 0) / identifyMen.length;
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
  const identifyWomen = people.filter((person) =>
    person.sex === 'f' && (withChildren
      ? people.some((child) =>
        child.mother === person.name) : true));

  return identifyWomen.reduce((sum, woman) =>
    sum + woman.died - woman.born, 0) / identifyWomen.length;
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
  const identifyChildren = people.filter(child =>
    people.find(person => person.name === child.mother)
    && (onlyWithSon
      ? child.sex === 'm' : true));

  const mothers = identifyChildren.map((child) =>
    people.find(mother => child.mother === mother.name));

  return identifyChildren.reduce((sum, child, index) =>
    sum + child.born - mothers[index].born, 0) / identifyChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
