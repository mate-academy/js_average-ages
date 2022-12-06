'use strict';

const isMale = (targetPerson) => targetPerson.sex === 'm';
const isFemale = (targetPerson) => targetPerson.sex === 'f';
const getAverageAge = group => {
  return Math.round(group
    .reduce((sum, { died, born }) =>
      sum + died - born, 0) / group.length * 100) / 100;
};
const isMom = (targetPerson, group) => {
  return group.some(sibling => sibling.mother === targetPerson.name);
};
const isChild = (targetPerson, group) => {
  return group.some(sibling => sibling.name === targetPerson.mother);
};

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
  const getCentury = yearOfBucket => Math.ceil(yearOfBucket / 100);
  const men = people.filter(person => century
    ? isMale(person)
    && getCentury(person.died) === century
    : isMale(person));

  return getAverageAge(men);
};

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
  const women = people.filter(person =>
    withChildren
      ? isFemale(person) && isMom(person, people)
      : isFemale(person)
  );

  return getAverageAge(women);
};

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
  const childs = people.filter(person => onlyWithSon
    ? isChild(person, people) && isMale(person)
    : isChild(person, people));

  const ageDifference = childs.map(({ mother, born: childBorn }) => {
    const { born: motherBorn } = people.find(({ name }) => name === mother);

    return childBorn - motherBorn;
  })
    .reduce((a, b) => a + b, 0);

  return Math.round(ageDifference / childs.length * 100) / 100;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
