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
  const { filteredMenCount, menSumAge } = people.reduce((acc, person) => {
    const { sex, born, died } = person;
    const isPerson = century
      ? sex === 'm' && Math.ceil(died / 100) === century
      : sex === 'm';

    return isPerson ? {
      menSumAge: acc.menSumAge + died - born,
      filteredMenCount: acc.filteredMenCount + 1,
    } : acc;
  }, {
    menSumAge: 0, filteredMenCount: 0,
  });

  return menSumAge / filteredMenCount;
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
  const mothers = people.reduce((acc, person) => {
    acc[person.mother] = person.name;

    return acc;
  }, {});

  const { womenSumAge, womenCount } = people.reduce((acc, person) => {
    const { name, sex, died, born } = person;

    const isPerson = withChildren ? mothers[name] : sex === 'f';

    return isPerson ? {
      womenSumAge: acc.womenSumAge + died - born,
      womenCount: acc.womenCount + 1,
    } : acc;
  }, {
    womenSumAge: 0, womenCount: 0,
  });

  return womenSumAge / womenCount;
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
  const mothers = people.reduce((acc, person) => {
    acc[person.name] = person;

    return acc;
  }, {});

  const { sum, childrenCount } = people.reduce((acc, person) => {
    const { sex, mother, born } = person;

    const isPerson = onlyWithSon
      ? sex === 'm' && mothers[mother]
      : mothers[mother];

    return isPerson ? {
      sum: acc.sum + born - mothers[mother].born,
      childrenCount: acc.childrenCount + 1,
    } : acc;
  }, {
    sum: 0, childrenCount: 0,
  });

  return sum / childrenCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
