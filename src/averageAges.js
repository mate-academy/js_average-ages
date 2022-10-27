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

  return century ? arrayCentury
    .reduce(
      (sum, person) => sum + (person.died - person.born), 0
    ) / arrayCentury.length
    : arrayMan
      .reduce(
        (sum, person) => sum + (person.died - person.born), 0
      ) / arrayMan.length;
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
  const withChild = [];

  for (let i = 0; i < arrayWomen.length; i++) {
    if (people
      .filter(
        person => person.mother === arrayWomen[i].name)[0] !== undefined) {
      withChild.push(arrayWomen[i]);
    }
  }

  const result = withChild.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  ) / withChild.length;

  return withChildren ? result
    : arrayWomen.reduce(
      (sum, person) => sum + (person.died - person.born), 0
    ) / arrayWomen.length;
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
  const mothers = [];
  let sumAgesSons = 0;
  let sumAgesKids = 0;

  for (let i = 0; i < people.length; i++) {
    const kids = people.filter(
      person => person.mother === people[i].name);

    if (kids.length > 0) {
      children.push(...kids);
      mothers.push(people[i]);
    }
  }

  const sons = children.filter(person => person.sex === 'm');

  for (let i = 0; i < mothers.length; i++) {
    sons.forEach(person => {
      if (person.mother === mothers[i].name) {
        sumAgesSons += person.born - mothers[i].born;
      }
    });

    children.forEach(person => {
      if (person.mother === mothers[i].name) {
        sumAgesKids += person.born - mothers[i].born;
      }
    });
  }

  return onlyWithSon ? (sumAgesSons / sons.length)
    : (sumAgesKids / children.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
