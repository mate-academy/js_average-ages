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
  const filtered = people.filter(person => {
    return century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';
  });

  const diedTotal = filtered.reduce((accamulator, object) =>
    accamulator + object.died, 0);
  const bornTotal = filtered.reduce((accamulator, object) =>
    accamulator + object.born, 0);

  return (diedTotal - bornTotal) / filtered.length;
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
  const filtered = people.filter(person => {
    return withChildren
      ? people.some(son => son.mother === person.name)
      : person.sex === 'f';
  });

  const diedTotal = filtered.reduce((accamulator, object) =>
    accamulator + object.died, 0);
  const bornTotal = filtered.reduce((accamulator, object) =>
    accamulator + object.born, 0);

  return (diedTotal - bornTotal) / filtered.length;
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
  const filteredMothers = people.filter(person =>
    people.some(child => child.mother === person.name));

  const filteredChildren = people.filter(person => {
    return onlyWithSon
      ? person.sex === 'm'
        && filteredMothers.some(mother => mother.name === person.mother)
      : filteredMothers.some(mother => mother.name === person.mother);
  });

  const motherIndexes = new Map();

  const differences = filteredChildren.map(child => {
    let motherIndex;

    motherIndexes.has(child.mother)
      ? motherIndex = motherIndexes.get(child.mother)
      : motherIndexes.set(child.mother,
        filteredMothers.findIndex(person => person.name === child.mother));

    motherIndex = motherIndexes.get(child.mother);

    return child.born - filteredMothers[motherIndex].born;
  });

  return differences.reduce((a, b) => a + b) / differences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
