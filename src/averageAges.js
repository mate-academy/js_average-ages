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
  const data = people.filter(person => person.sex === 'm');

  const calculateCentury = data
    .filter(person => Math.ceil(person.died / 100) === century);

  let dataWithCentury;

  if (century) {
    dataWithCentury = calculateCentury;
  } else {
    dataWithCentury = data;
  }

  const ages = dataWithCentury.map(age => age.died - age.born);

  const result = ages.reduce((a, b) => a + b, 0) / ages.length;

  return result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const data = people.filter(person => person.sex === 'f');

  const isChildrencalculate = data.filter(person => people
    .find(child => child.mother === person.name));

  let isChildren;

  if (withChildren) {
    isChildren = isChildrencalculate;
  } else {
    isChildren = data;
  }

  const ages = isChildren.map(age => age.died - age.born);

  const result = ages.reduce((a, b) => a + b, 0) / ages.length;

  return result;
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
  const mothers = people
    .filter(currentPerson => people
      .some(child => child.mother === currentPerson.name));

  const children = people.filter(child =>
    mothers.find(mother => onlyWithSon
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name
    ));

  return children
    .map(human => human.born - people
      .find(woman => woman.name === human.mother).born)
    .reduce((sum, age) => sum + age, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
