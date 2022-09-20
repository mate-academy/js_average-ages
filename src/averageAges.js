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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(person => Math.ceil(person.died / 100) === century);
  }

  const ageDifference = men.map(person => person.died - person.born);

  return calculateAverageAge(ageDifference);
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
  const mothersList = people.map(person => person.mother);
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter(person => mothersList.includes(person.name));
  }

  const ageDifference = women.map(person => person.died - person.born);

  return calculateAverageAge(ageDifference);
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
  const peopleNameList = people.map(person => person.name);
  let childrenWithMothers
    = people.filter(person => peopleNameList.includes(person.mother));

  if (onlyWithSon) {
    childrenWithMothers
      = childrenWithMothers.filter(person => person.sex === 'm');
  }

  const ageDifference = childrenWithMothers.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return calculateAverageAge(ageDifference);
}

function calculateAverageAge(ageDifference) {
  if (!ageDifference.length) {
    return 0;
  }

  const sumOfAgeDiff = ageDifference.reduce((sum, ageDiff) => sum + ageDiff, 0);

  return sumOfAgeDiff / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
