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
  const onlyMen = people.filter(({ died, sex }) => {
    const isMan = sex === 'm';
    const isFromCentury = century
      ? Math.ceil(died / 100) === century
      : true;

    return isMan && isFromCentury;
  });

  const ageSum = onlyMen.reduce((acc, { born, died }) => {
    return acc + died - born;
  }, 0);

  return ageSum / onlyMen.length;
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
  const onlyWomen = people.filter(({ sex, name }) => {
    return withChildren
      ? people.some(({ mother }) => mother === name)
      : sex === 'f';
  });

  const averageAge = calculateAverageAge(onlyWomen);

  return averageAge;
}

function calculateAverageAge(people) {
  const ageSum = people.reduce((acc, { born, died }) => {
    return acc + died - born;
  }, 0);

  return ageSum / people.length;
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
  const onlyWithMother = people.filter(({ mother, sex }) => {
    return onlyWithSon
      ? Boolean(mother) && sex === 'm'
      : Boolean(mother);
  });

  let count = 0;

  const ageSum = onlyWithMother.reduce((acc, { born, died, mother }) => {
    const personsMother = people.find(({ name }) => {
      return name === mother;
    });

    if (!personsMother) {
      return acc;
    }

    count++;

    const difference = born - personsMother.born;

    return acc + difference;
  }, 0);

  return ageSum / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
