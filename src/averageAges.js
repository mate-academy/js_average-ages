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
  const data = people.filter(
    person => century
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  );

  const averageAge = data.reduce((prev, person) => {
    return prev + (person.died - person.born);
  }, 0);

  return Math.round(averageAge / data.length * 100) / 100;
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
  const data = people.filter(
    person => withChildren
      ? people.some((child) =>
        child.mother === person.name
      )
      : person.sex === 'f'
  );

  const averageAge = data.reduce((prev, person) => {
    return prev + (person.died - person.born);
  }, 0);

  return Math.round(averageAge / data.length * 100) / 100;
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
  let data = people.filter(
    person => onlyWithSon
      ? people.some((child) =>
        person.mother === child.name
      ) && person.sex === 'm'
      : people.some((child) => child.name === person.mother)
  );

  data = data.map((person) => {
    return person.born - people.find(
      mother => mother.name === person.mother
    ).born;
  });

  return data.reduce((prev, personAge) => prev + personAge) / data.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
