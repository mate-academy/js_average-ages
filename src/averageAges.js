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
  let menArr;

  if (!century) {
    menArr = people.filter(person => person.sex === 'm');
  } else {
    menArr = people.filter(person => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    });
  }

  const ageSum = menArr.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return ageSum / menArr.length;
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
  let womenArr;

  if (!withChildren) {
    womenArr = people.filter(person => person.sex === 'f');
  } else {
    womenArr = people.filter(person => {
      return person.sex === 'f' && people.some(p => p.mother === person.name);
    });
  }

  const ageSum = womenArr.reduce((acc, person) => {
    return acc + (person.died - person.born);
  }, 0);

  return ageSum / womenArr.length;
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
  let diff = 0;
  let count = 0;

  people.forEach(child => {
    if (onlyWithSon && child.sex === 'f') {
    } else {
      const mother = people.find(person => child.mother === person.name);

      if (mother) {
        diff += child.born - mother.born;
        count++;
      }
    }
  });

  const res = diff / count;

  return res;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
