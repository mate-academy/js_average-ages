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
  let men = people.filter(item => item.sex === 'm');

  if (century) {
    men = men.filter(item => Math.ceil(item.died / 100) === century);
  }

  const ages = men.map(item => item.died - item.born);

  return ages.reduce((prev, next) => prev + next) / ages.length;
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
  let women = people.filter(item => item.sex === 'f');

  if (withChildren) {
    women = women.filter(item =>
      people.find(innerItem => innerItem.mother === item.name));
  }

  const ages = women.map(item => item.died - item.born);

  return ages.reduce((prev, next) => prev + next) / ages.length;
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
  let peopleWithMother = people.filter(item =>
    people.some(innerItem => innerItem.name === item.mother));

  if (onlyWithSon) {
    peopleWithMother = peopleWithMother.filter(item => item.sex === 'm');
  }

  const bornChildren = peopleWithMother.map(el => el.born);

  const bornMother = peopleWithMother.map(function(item) {
    return people.find(innerItem => innerItem.name === item.mother).born;
  });

  const totalChildrenAge = bornChildren.reduce((prev, next) => prev + next);
  const totalMothersAge = bornMother.reduce((prev, next) => prev + next);

  return (totalChildrenAge - totalMothersAge) / bornChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
