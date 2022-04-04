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
  const choiceMen = ({ sex, died }) => {
    let isCentury;

    isFinite(century)
      ? isCentury = Math.ceil(died / 100) === century
      : isCentury = true;

    return (sex === 'm') && isCentury;
  };

  const men = people.filter(choiceMen);

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
  const findMother = ({ sex, name }) => {
    let isMother;

    withChildren
      ? isMother = people.some(({ mother }) => mother === name)
      : isMother = true;

    return (sex === 'f') && isMother;
  };

  let women = people.filter(findMother);

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
  const findChildren = ({ mother, sex }) => {
    let isChild;

    onlyWithSon
      ? isChild = people.some(({ name }) =>
        (mother === name) && (sex === 'm'))
      : isChild = people.some(({ name }) =>
        mother === name);

    return isChild;
  };
  const findMother = ({ mother }) => {
    return people.find(({ name }) => name === mother);
  };

  const children = people.filter(findChildren);

  const women = children.map(findMother);

  const bornChildren = children.reduce((pre, { born }) => pre + born, 0);
  const bornWomen = women.reduce((pre, { born }) => pre + born, 0);

  return (bornChildren - bornWomen) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
