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
  const avMenAge = people.filter(person => person.sex === 'm')
    .reduce((accum, person, i, arr) => {
      return (accum + (person.died - person.born) / arr.length);
    }, 0);

  const avMenAgeCentury = people.filter(person => person.sex === 'm')
    .filter(person => (Math.ceil(person.died / 100)) === century)
    .reduce((accum, person, i, arr) => {
      return (accum + (person.died - person.born) / arr.length);
    }, 0);

  let result;

  century ? (
    result = avMenAgeCentury
  ) : (
    result = avMenAge
  );

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
  const avWomenAge = people.filter(person => person.sex === 'f')
    .reduce((accum, person, i, arr) => {
      return (accum + (person.died - person.born) / arr.length);
    }, 0);

  const avWomenWithChildren = people.filter(person => person.sex === 'f')
    .filter(mother => people.some(child => child.mother === mother.name))
    .reduce((accum, person, i, arr) => {
      return (accum + (person.died - person.born) / arr.length);
    }, 0);

  let result;

  withChildren ? (
    result = avWomenWithChildren
  ) : (
    result = avWomenAge
  );

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
  let children = people.filter(child => people.some(mother => {
    return child.mother === mother.name;
  }));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDiff = children.map(child => {
    const mother = people.find(person => child.mother === person.name);

    return child.born - mother.born;
  });

  const ageSum = ageDiff.reduce((accum, age) => {
    return accum + age;
  });

  return ageSum / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
