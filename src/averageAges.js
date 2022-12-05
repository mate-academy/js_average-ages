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
  let menCount = 0;
  const men = people.filter(person => person.sex === 'm');
  const totalAges = men.reduce((sum, man) => {
    const manDiedCentury = Math.ceil(man.died / 100);

    if (century) {
      if (manDiedCentury === century) {
        menCount++;

        return sum + (man.died - man.born);
      }

      return sum;
    } else {
      menCount++;

      return sum + (man.died - man.born);
    }
  }, 0);

  const averageAge = Number((totalAges / menCount).toFixed(2));

  return averageAge || 0;
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
  let womenCount = 0;
  const women = people.filter(person => person.sex === 'f');
  const totalAges = women.reduce((sum, woman) => {
    if (withChildren) {
      const isMother = people.some(person => person.mother === woman.name);

      if (isMother) {
        womenCount++;

        return sum + (woman.died - woman.born);
      }

      return sum;
    } else {
      womenCount++;

      return sum + (woman.died - woman.born);
    }
  }, 0);

  const averageAge = Number((totalAges / womenCount).toFixed(2));

  return averageAge || 0;
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
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
