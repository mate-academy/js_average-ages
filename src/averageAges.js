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
  let onlyMen = people.filter((person) => person.sex === 'm');

  if (century) {
    onlyMen = onlyMen.filter(person => {
      return Math.ceil(person.died / 100) === century;
    });
  }

  const sum = onlyMen.reduce((a, b) => a + (b.died - b.born), 0);

  return sum / onlyMen.length;
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
  let onlyWomen = people.filter((person) => person.sex === 'f');

  if (withChildren) {
    onlyWomen = onlyWomen.filter((woman) => {
      return people.some((person) => person.mother === woman.name);
    }
    );
  }

  const sum = onlyWomen.reduce((a, b) => a + (b.died - b.born), 0);

  return sum / onlyWomen.length;
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
  const ages = [];
  const onlyMothers = people.filter(woman => {
    return people.some((person) => person.mother === woman.name);
  });

  onlyMothers.forEach(mother => {
    const children = people.filter(person => {
      if (onlyWithSon) {
        return person.mother === mother.name && person.sex === 'm';
      }

      return person.mother === mother.name;
    });

    children.forEach(child => ages.push(child.born - mother.born));
  });

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
