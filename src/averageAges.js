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
function getAverageValue(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getPeopleBySex(value) {
  return (person) => person.sex === value;
}

function calculateMenAverageAge(people, century) {
  const males = people.filter(getPeopleBySex('m'));

  const filteredMales = century
    ? males.filter(person => Math.ceil(person.died / 100) === century)
    : males;

  const maleAges = filteredMales.map(male => (male.died - male.born));

  return getAverageValue(maleAges);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `wifilteredChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} wifilteredChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, wifilteredChildren) {
  const females = people.filter(getPeopleBySex('f'));

  const hasChild = function(person) {
    return (potentialChild) => potentialChild.mother === person.name;
  };

  const mothers = females
    .filter(female => people.some(hasChild(female)));

  const convertToAge = (female) => female.died - female.born;

  const femaleAges = !wifilteredChildren
    ? females.map(convertToAge)
    : mothers.map(convertToAge);

  return getAverageValue(femaleAges);
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
  const children = people
    .filter(person => people.some(parent => person.mother === parent.name));

  const filteredChildren = onlyWithSon
    ? children.filter(getPeopleBySex('m'))
    : children;

  const mothers = filteredChildren
    .map(child => people.find(mother => mother.name === child.mother));

  const differenceAges = filteredChildren
    .map((child, index) => child.born - mothers[index].born);

  return getAverageValue(differenceAges);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
