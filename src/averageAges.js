'use strict';

function getAverage(people) {
  const sumAges = people.reduce((sum, pers) => {
    const persAge = pers.died - pers.born;

    return sum + persAge;
  }, 0);

  return (sumAges / people.length);
}

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people.filter(
    century
      ? pers => {
        const validCentury = Math.ceil(pers.died / 100) === century;

        return validCentury && pers.sex === 'm';
      }
      : pers => pers.sex === 'm');

  return getAverage(men);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(withChildren
    ? pers => {
      const validChild = people.find(child =>
        child.mother === pers.name);

      return validChild && pers.sex === 'f';
    }
    : pers => pers.sex === 'f');

  return getAverage(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const validMother = (child) => {
    const findMother = (people.find(mother =>
      child.mother === mother.name));

    return onlyWithSon
      ? findMother && child.sex === 'm'
      : findMother;
  };

  const childsWithMother = people.filter(validMother);
  const sumOfAges = childsWithMother.reduce((sum, pers) => {
    const diffAge = pers.born - people.find(mother =>
      pers.mother === mother.name).born;

    return sum + diffAge;
  }, 0);

  return sumOfAges / childsWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
