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
  const arrayMan = people.filter(person => person.sex === 'm');
  const arrayCentury = arrayMan
    .filter(person => Math.ceil(person.died / 100) === century);
  let averageAgeMan = 0;
  let averageAgeCentury = 0;

  averageAgeMan = arrayCentury
    .reduce(
      (sum, person) => sum + (person.died - person.born), 0
    ) / arrayCentury.length;

  averageAgeCentury = arrayMan
    .reduce(
      (sum, person) => sum + (person.died - person.born), 0
    ) / arrayMan.length;

  return century ? averageAgeMan : averageAgeCentury;
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
  const arrayWomen = people.filter(person => person.sex === 'f');
  let averageWomensAge = 0;

  const withChild = arrayWomen.filter(women => {
    if (people
      .filter(
        person => person.mother === women.name)[0] !== undefined) {
      return women;
    }
  });

  const AverageMothersAge = withChild.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  ) / withChild.length;

  averageWomensAge = arrayWomen.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  ) / arrayWomen.length;

  return withChildren ? AverageMothersAge : averageWomensAge;
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
  const children = [];
  let sumAgesSons = 0;
  let sumAgesKids = 0;

  const mothers = people.filter(women => {
    const kids = people.filter(
      person => person.mother === women.name);

    if (kids.length > 0) {
      children.push(...kids);

      return women;
    }
  });

  const sons = children.filter(person => person.sex === 'm');

  mothers.filter(women => {
    sons.filter(person => {
      if (person.mother === women.name) {
        sumAgesSons += person.born - women.born;
      }
    });

    children.filter(person => {
      if (person.mother === women.name) {
        sumAgesKids += person.born - women.born;
      }
    });
  });

  return onlyWithSon ? (sumAgesSons / sons.length)
    : (sumAgesKids / children.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
