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

  const theSamecentury = people
    .filter((person) => {
      return Math.ceil(person.died / 100) === century
      && person.sex === 'm';
    });

  const onlyMan = people
    .filter((person) => {
      return person.sex === 'm';
    });

  const lifeDuration = theSamecentury
    .map((year) => year.died - year.born);

  const lifeDurationMan = onlyMan
    .map((year) => year.died - year.born);

  const sumAgeMenSame = lifeDuration
    .reduce((prev, age) => prev + age, 0);

  const sumAgeMenAll = lifeDurationMan
    .reduce((prev, age) => prev + age, 0);

  const everageManSameCent = sumAgeMenSame / theSamecentury.length;

  const everageAllMan = sumAgeMenAll / onlyMan.length;

  return century !== undefined
    ? +everageManSameCent.toFixed(2)
    : +everageAllMan.toFixed(2);
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
      return person.sex === 'f'
        && people
          .some((p) => p.mother === person.name);
    });

  const lifeDurationMom = onlyMom
    .map((year) => year.died - year.born);

  const sumageAgeMom = lifeDurationMom
    .reduce((prev, age) => prev + age, 0);

  const everageDurationMom = sumageAgeMom / lifeDurationMom.length;

  const allWomen = people
    .filter((person) => person.sex === 'f');

  const lifeDurationAllWomen = allWomen
    .map((year) => year.died - year.born);

  const sumAllWomen = lifeDurationAllWomen
    .reduce((prev, age) => prev + age, 0);

  const everageAllWomen = sumAllWomen / allWomen.length;

  return withChildren !== true
    ? everageAllWomen
    : everageDurationMom;
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

  const motherOfSon = people
    .filter((person) => person.sex === 'f'
      && people
        .some((p) => p.mother === person.name
          && p.sex === 'm'));

  const sons = people
    .filter((person) => person.sex === 'm'
      && people
        .some((p) => person.mother === p.name));

  const yearsOldMom = sons.map(borned => {
    const momsAges = motherOfSon
      .map((year) => borned.born - year.born);
    const averageMomsAge = momsAges
      .reduce((sum, age) => sum + age, 0) / momsAges.length;

    return averageMomsAge;
  });

  const sumAgeMotherWithSon = yearsOldMom
    .reduce((prev, year) => prev + year, 0);

  const agesSons = sons
    .map((year) => year.died - year.born);

  const sumOfAgeSon = agesSons
    .reduce((prev, age) => prev + age, 0);

  const resultDiffSon
    = (sumOfAgeSon / sons.length) - (sumAgeMotherWithSon / motherOfSon.length);

  // 'Average age difference'

  const mothers = people.filter((person) => person.sex === 'f');
  const children = people.filter((person) => person.mother !== null);

  const ageDiffs = children.map((child) => {
    const mother = mothers.find((person) => person.name === child.mother);

    return mother ? child.born - mother.born : 0;
  });

  const totalAgeDiff = ageDiffs.reduce((total, ageDiff) => total + ageDiff, 0);
  const averageAgeDiff = totalAgeDiff / mothers.length;

  return onlyWithSon
    ? resultDiffSon
    : averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
