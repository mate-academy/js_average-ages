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
  // let mensCount = 0;
  let men = people
    .filter(({ sex }) => sex === 'm');

  if (century) {
    men = men
      .filter(({ died }) => century === Math.ceil(died / 100));
  }

  const averageAgeOfMen = men
    .reduce((acc, { died, born }) => acc + died - born, 0);

  return averageAgeOfMen / men.length;
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
  let women = people
    .filter(({ sex }) => sex === 'f');

  if (withChildren) {
    women = women
      .filter(({ name }) => people.some(({ mother }) => mother === name));
  }

  const averageWomenAge = women
    .reduce((acc, { died, born }) => acc + died - born, 0);

  return averageWomenAge / women.length;
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
  const ageGap = [];

  const mothers = people.filter(person =>
    people.some(child => child.mother === person.name));

  const children = people.filter(child =>
    mothers.some(mom => child.mother === mom.name));

  if (onlyWithSon) {
    const sons = children
      .filter(person => person.sex === 'm');

    sons
      .map(child => ageGap
        .push(child.born - mothers
          .find(mom => mom.name === child.mother).born));
  } else {
    children
      .map(child => ageGap
        .push(child.born - mothers
          .find(mom => mom.name === child.mother).born));
  }

  return ageGap
    .reduce((acc, age) => (acc + age), 0) / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
