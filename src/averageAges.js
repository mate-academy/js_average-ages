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
    .filter(man => century
      ? Math.ceil(man.died / 100) === century && man.sex === 'm'
      : man.sex === 'm'
    );
  const sumAges = men.reduce((sum, man) => (sum + (man.died - man.born)), 0);

  return sumAges / (men.length);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women
      .filter(woman => people.some(person => person.mother === woman.name));
  }

  const sumAges = women
    .reduce((sum, woman) => (sum + (woman.died - woman.born)), 0);

  return sumAges / (women.length);
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
  const childInfo = people.filter(person => {
    return !onlyWithSon
      ? people.some(female => female.name === person.mother)
      : person.sex === 'm' && people.some(female => {
        return female.name === person.mother;
      });
  });

  const difAges = childInfo.map(child => {
    const mother = people.find(women => child.mother === women.name);

    return child.born - mother.born;
  });
  const averageAge = difAges.reduce((ageA, ageB) => ageA + ageB);

  return averageAge / childInfo.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
