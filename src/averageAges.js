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
    const manWillBeCalculated = century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm';

    return manWillBeCalculated;
  });

  return (
    men.reduce((pre, { born, died }) => pre + (died - born), 0) / men.length);
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
    const womenWillBeCalculated = withChildren
      ? person.sex === 'f'
        && people.some((person2) => person.name === person2.mother)
      : person.sex === 'f';

    return womenWillBeCalculated;
  });

  return (women.reduce((pre, { born, died }) =>
    pre + (died - born), 0) / women.length);
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
  const children = people.filter((person) => {
    const childrenSex = onlyWithSon
      ? people.some((person2) => (person.mother === person2.name)
        && (person.sex === 'm'))
      : people.some((person2) => person.mother === person2.name);

    return childrenSex;
  });

  const women = children.map((person) =>
    people.find((person2) =>
      person2.name === person.mother));

  const bornChildren = children.reduce((pre, { born }) => pre + born, 0);
  const bornWomen = women.reduce((pre, { born }) => pre + born, 0);

  return (bornChildren - bornWomen) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
