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
  const men = people
    .filter((person) => century
      ? person.sex === 'm' && (century === Math.ceil(person.died / 100))
      : person.sex === 'm');

  const totalAge = men
    .reduce((sum, man) => (man.died - man.born) + sum, 0);

  return totalAge / men.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people
    .map((person) => person.mother)
    .filter((name) => !!name);

  const women = people
    .filter((person) => withChildren
      ? person.sex === 'f' && mothers.includes(person.name)
      : person.sex === 'f');

  const totalAge = women
    .reduce((sum, woman) => (woman.died - woman.born) + sum, 0);

  return totalAge / women.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageData = people.reduce((acc, person) => {
    const criteria = onlyWithSon ? person.sex === 'm' : true;

    if (criteria) {
      const mother = people.filter((human) => human.name === person.mother)[0];

      if (mother) {
        acc.totalAge += person.born - mother.born;
        acc.mothersCount += 1;
      }
    }

    return acc;
  }, {
    mothersCount: 0, totalAge: 0,
  });

  return ageData.totalAge / ageData.mothersCount;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
