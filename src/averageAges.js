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
function calculateMenAverageAge(people, century = false) {
  let count = 0;
  const manAgeSum = people.reduce((accum, person, ind) => {
    const dieCentury = Math.ceil(person.died / 100);

    return (century === dieCentury && person.sex === 'm') ? (
      count++,
      accum + (person.died - person.born)
    ) : (!century && person.sex === 'm') ? (
      count++,
      accum + (person.died - person.born)
    ) : accum + 0;
  }, 0);

  return Number((manAgeSum / count).toFixed(2));
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
function calculateWomenAverageAge(people, withChildren = false) {
  let count = 0;

  const mothersList = (withChildren) ? (
    people.map(person => {
      return (person.mother !== null) ? (
        person.mother
      ) : false;
    })
  ) : null;

  const womenAgeSum = people.reduce((accum, person, ind) => {
    return ((withChildren === false) && person.sex === 'f') ? (
      count++,
      accum + (person.died - person.born)
    ) : (person.sex === 'f' && mothersList.includes(person.name)) ? (
      count++,
      accum + (person.died - person.born)
    ) : accum + 0;
  }, 0);

  return Number((womenAgeSum / count).toFixed(2));
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let childCount = 0;

  const childrenList = people.map(person => {
    return (onlyWithSon === false && person.mother !== null) ? (
      person.name
    ) : (onlyWithSon && person.mother !== null && person.sex === 'm') ? (
      person.name
    ) : null;
  });

  const bornSum = people.reduce((accum, person) => {
    const momBorn = people.find(elem => {
      return elem.name === person.mother;
    });

    return (childrenList.includes(person.name) && momBorn !== undefined) ? (
      childCount++,
      accum + (person.born - momBorn.born)
    ) : accum + 0;
  }, 0);

  return Number((bornSum / childCount).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
