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
  let men = people.filter(({ sex }) => sex === 'm');

  (arguments.length === 2)
    && (men = men.filter(({ died }) => Math.ceil(died / 100) === century));

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
  let women = people.filter(({ sex }) => sex === 'f');
  const findMother = ({ name }) => {
    return people.some(({ mother }) => mother === name);
  };

  (withChildren) && (women = women.filter(findMother));

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
  const findChildren = ({ mother }) => {
    return people.some(({ name }) => mother === name);
  };
  const findMother = ({ mother }) => {
    return people.find(({ name }) => name === mother);
  };

  let children = Array.from(people);

  (onlyWithSon) && (children = people.filter(({ sex }) => sex === 'm'));
  children = children.filter(findChildren);

  const women = children.map(findMother);

  const bornChildren = children.reduce((pre, { born }) => pre + born, 0);
  const bornWomen = women.reduce((pre, { born }) => pre + born, 0);

  return (bornChildren - bornWomen) / children.length;
  // return bornWomen;
  // return women.length;
  // women.sort((woman1, woman2) =>
  //   woman1.name.localeCompaire(woman2.name));

  // children.sort((child1, child2) =>
  //   child1.mother.localeCompaire(child2.mother));

  // const result = women.map(({ born }) => );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
