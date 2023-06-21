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
  const men = people.filter(
    (person) =>
      century
        ? Math.ceil(person.died / 100) === century && person.sex === 'm'
        : person.sex === 'm'
  );

  return calculateAverageAges(men);
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
  const women = people.filter((person) => person.sex === 'f');

  return withChildren
    ? calculateAverageAges(getAllMothers(people))
    : calculateAverageAges(women);
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
  const mothers = getAllMothers(people);

  const children = people.filter((child) => onlyWithSon
    ? child.mother !== null && child.sex === 'm'
    : child.mother !== null
  );

  const ageDiff = children.map((child) => {
    const mother = findChildMother(mothers, child);

    if (mother) {
      return child.born - mother.born;
    }

    return 0;
  }).filter((ageDiffItem) => ageDiffItem !== 0);

  const sumOfDiff = ageDiff.reduce(
    (sum, ageDiffItem) =>
      (sum + ageDiffItem), 0
  );

  return sumOfDiff / ageDiff.length;
}

function calculateAverageAges(people) {
  const allAges = people.reduce(
    (sum, person) =>
      (sum + (person.died - person.born)), 0
  );

  return allAges / people.length;
}

function getAllMothers(people) {
  return people.filter(
    (person) =>
      people.some(
        (child) =>
          child.mother === person.name
      )
  );
}

function findChildMother(mothers, child) {
  return mothers.find(
    (mother) =>
      mother.name === child.mother
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
