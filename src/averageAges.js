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
  const men = people.filter(person => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  return calculateAverageAge(men);
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
  const women = people.filter(person => {
    return withChildren
      ? people.some(son => son.mother === person.name)
      : person.sex === 'f';
  });

  return calculateAverageAge(women);
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
  const mothers = people.filter(person =>
    people.some(child => child.mother === person.name));

  const children = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm'
        && mothers.some(mother => mother.name === person.mother)
      : mothers.some(mother => mother.name === person.mother);
  });

  const motherIndexes = new Map();

  const differences = children.map(child => {
    let motherIndex;

    motherIndexes.has(child.mother)
      ? motherIndex = motherIndexes.get(child.mother)
      : motherIndexes.set(child.mother,
        mothers.findIndex(person => person.name === child.mother));

    motherIndex = motherIndexes.get(child.mother);

    return child.born - mothers[motherIndex].born;
  });

  return differences.reduce((a, b) => a + b) / differences.length;
}

function calculateAverageAge(data) {
  const diedTotal = data.reduce((accumulator, object) =>
    accumulator + object.died, 0);
  const bornTotal = data.reduce((accumulator, object) =>
    accumulator + object.born, 0);

  return (diedTotal - bornTotal) / data.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
