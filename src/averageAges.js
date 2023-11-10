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
  const men = people.filter((person) =>
    person.sex === 'm' && (!century || Math.ceil(person.died / 100) === century)
  );

  const sum = men.reduce((totalAge, person) =>
    totalAge + (person.died - person.born), 0);

  const averageMan = sum / men.length;

  return averageMan;
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
  const women = people.filter((person) =>
    person.sex === 'f' && (!withChildren || people.some((child) =>
      child.mother === person.name))
  );

  if (women.length === 0) {
    return 0;
  }

  const sum = women.reduce((totalAge, person) =>
    totalAge + (person.died - person.born), 0);

  const averageWoman = sum / women.length;

  return averageWoman;
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
  const mothers = people.filter((person) => people.some((mother) =>
    mother.name === person.mother));

  const children = onlyWithSon ? mothers.filter((person) =>
    person.sex === 'm') : mothers;

  if (children.length === 0) {
    return 0;
  }

  const differenceGap = children.map((child) => {
    const mother = people.find((person) => person.name === child.mother);

    if (mother && 'born' in child && 'born' in mother) {
      return child.born - mother.born;
    } else {
      return 0;
    }
  });

  const sum = differenceGap.reduce((total, gap) => total + gap, 0);
  const differenceGapAverage = sum / differenceGap.length;

  return differenceGapAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
