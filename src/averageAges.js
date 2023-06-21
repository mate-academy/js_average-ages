'use strict';

function calculateAverageAge(people) {
  const sumOfAges = people
    .reduce((sum, person) => sum + (person.died - person.born), 0);

  return sumOfAges / people.length;
}

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
  const menFiltered = people.filter((person) => {
    const deathCentury = Math.ceil(person.died / 100);

    return century !== undefined
      ? deathCentury === century && person.sex === 'm'
      : person.sex === 'm';
  });

  return calculateAverageAge(menFiltered);
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
  const womenFiltered = people.filter((person) => {
    const isMother = people.some(child => child.mother === person.name);

    return withChildren
      ? isMother && person.sex === 'f'
      : person.sex === 'f';
  });

  return calculateAverageAge(womenFiltered);
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
  const mothers = people.filter(
    person => people.some(
      otherPerson => otherPerson.mother === person.name
    )
  );

  const children = people.filter(person => {
    const hasMother = mothers.some(mother => mother.name === person.mother);

    return onlyWithSon
      ? person.sex === 'm' && hasMother
      : hasMother;
  });

  const sumOfAgeDiffs = children.reduce((sum, child) => {
    const motherOfChild = mothers.find(mother => mother.name === child.mother);

    const ageDifference = child.born - motherOfChild.born;

    return sum + ageDifference;
  }, 0);

  return sumOfAgeDiffs / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
