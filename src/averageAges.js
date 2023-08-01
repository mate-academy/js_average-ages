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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const theMan = people
    .filter((person) => {
      return century
        ? Math.ceil(person.died / 100) === century && person.sex === 'm'
        : person.sex === 'm';
    });

  const lifeDuration = theMan
    .map((year) => year.died - year.born)
    .reduce((prev, age) => prev + age, 0);

  const everageAge = lifeDuration / theMan.length;

  everageAge.toFixed(2);

  return +everageAge;
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
  const onlyMom = people
    .filter((person) => {
      return !withChildren
        ? person.sex === 'f'
        : person.sex === 'f'
        && people
          .some((p) => p.mother === person.name);
    });

  const lifeDurMom = onlyMom
    .map((year) => year.died - year.born)
    .reduce((prev, age) => prev + age, 0);

  const evarageAge = lifeDurMom / onlyMom.length;

  return evarageAge;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  // 'Average age difference with son'

  const mothers = people
    .filter((person) => {
      return !onlyWithSon
        ? person.sex === 'f'
        : person.sex === 'f'
        && people.some((p) => p.mother === person.name
          && p.sex === 'm');
    });

  const children = people
    .filter((person) => {
      return !onlyWithSon
        ? person.mother !== null
        : person.sex === 'm'
        && people
          .some((p) => person.mother === p.name);
    });

  const yearsOldMom = children.map(borned => {
    const momsAges = mothers
      .map((year) => borned.born - year.born);
    const averageMomsAge = momsAges
      .reduce((sum, age) => sum + age, 0) / momsAges.length;

    return averageMomsAge;
  });

  const sumAgeMother = yearsOldMom
    .reduce((prev, year) => prev + year, 0);

  const ageChildren = children
    .map((year) => year.died - year.born)
    .reduce((prev, age) => prev + age, 0);

  const resultDiffSon
    = (ageChildren / children.length) - (sumAgeMother / mothers.length);

  const ageDiff = children
    .map((child) => {
      const mother = mothers
        .find((person) => person.name === child.mother);

      return mother
        ? child.born - mother.born
        : 0;
    });

  const totalAgeDiff = ageDiff.reduce((total, age) => total + age, 0);

  const averageAgeDiff = totalAgeDiff / mothers.length;

  const resultDif = onlyWithSon
    ? resultDiffSon
    : averageAgeDiff;

  return resultDif;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
