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
  const filteredByCentury = people.filter((male) => {
    const allMales = male.sex === 'm';
    const calcedCentury = Math.ceil(male.died / 100);
    const diedInCentury = calcedCentury === century && allMales;

    return century ? diedInCentury : allMales;
  });

  return calculateAverage(filteredByCentury);
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
  const filteredWithChildren = people.filter((female) => {
    const allFemales = female.sex === 'f';
    const hasChildren = people.find((person) => female.name === person.mother);

    return withChildren ? hasChildren : allFemales;
  });

  return calculateAverage(filteredWithChildren);
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
  const filteredChildren = people.filter((child) => {
    const allSons = child.sex === 'm';
    const isChild = findMother(people, child);

    return onlyWithSon ? allSons && isChild : isChild;
  });

  const ageDiff = filteredChildren.map((child) => {
    const mother = findMother(people, child);

    return child.born - mother.born;
  });

  const agesSum = ageDiff.reduce((acc, cur) => acc + cur);

  return agesSum / ageDiff.length;
}

function calculateAverage(filteredData) {
  const ages = filteredData.map((person) => person.died - person.born);

  const agesSum = ages.reduce((acc, cur) => acc + cur);

  return agesSum / ages.length;
}

function findMother(people, person) {
  return people.find((female) => person.mother === female.name);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
