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

const ageAverege = (sum, amount) => Number((sum / amount).toFixed(2));

function calculateMenAverageAge(people, century) {
  const diedPeople = people.filter(person => {
    const deathCentury = Math.ceil(person.died / 100);

    if (century === deathCentury || century === undefined) {
      return person.sex === 'm';
    }
  });

  const ageSum = diedPeople.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return ageAverege(ageSum, diedPeople.length);
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
  const mothersList = people.map(person => {
    return person.mother;
  });

  const women = people.filter(person => {
    return withChildren
      ? mothersList.includes(person.name)
      : person.sex === 'f';
  });

  const ageSum = women.reduce((acc, item) => {
    return acc + (item.died - item.born);
  }, 0);

  return ageAverege(ageSum, women.length);
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
  let amountFamilies = 0;

  const sumDiffs = people.reduce((acc, child) => {
    let indexMother = 0;
    let ageDiff = 0;

    indexMother = onlyWithSon
      ? people.findIndex(mother =>
        mother.name === child.mother && child.sex === 'm')
      : people.findIndex(mother => mother.name === child.mother);

    if (indexMother !== -1) {
      amountFamilies++;
      ageDiff += child.born - people[indexMother].born;
    };

    return acc + ageDiff;
  }, 0);

  return ageAverege(sumDiffs, amountFamilies);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
