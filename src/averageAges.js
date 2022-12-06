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
  const man = people.filter((person) => {
    const isMale = person.sex === 'm';

    return century
      ? Math.ceil(person.died / 100) === century && isMale
      : isMale;
  });

  const manAge = man.map((person) => person.died - person.born);

  return calculateAverageAge(manAge);
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
    return withChildren ? people.find((child) => person.name === child.mother)
      : person.sex === 'f';
  });

  const womenAge = women.map((person) => person.died - person.born);

  return calculateAverageAge(womenAge);
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
  const womenWithChildren = people.filter((child) => {
    const findByName = people.find((woman) => woman.name === child.mother);

    return onlyWithSon
      ? findByName && child.sex === 'm'
      : findByName;
  });

  const ageDifferences = womenWithChildren.map((child) => {
    return (
      child.born - people.find((woman) => woman.name === child.mother).born
    );
  });

  return calculateAverageAge(ageDifferences);
}

function calculateAverageAge(array) {
  return array.reduce(
    (acc, year) => acc + year) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
