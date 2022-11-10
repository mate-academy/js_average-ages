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
  let sumAge = 0;
  let countMan = 0;

  people.forEach((person) => {
    if (person.sex === 'm') {
      if (century) {
        if (Math.ceil(person.died / 100) === century) {
          sumAge += (person.died - person.born);
          countMan++;
        }
      } else {
        sumAge += (person.died - person.born);
        countMan++;
      }
    }
  });

  return sumAge / countMan;
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
  let sumAge = 0;
  let countWomen = 0;

  people.forEach((person) => {
    if (person.sex === 'f') {
      if (withChildren) {
        if (people.some(child => child.mother === person.name)) {
          sumAge += (person.died - person.born);
          countWomen++;
        }
      } else {
        sumAge += (person.died - person.born);
        countWomen++;
      }
    }
  });

  return sumAge / countWomen;
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
  let sumAge = 0;
  let count = 0;

  people.forEach((person) => {
    if (onlyWithSon) {
      if (person.sex === 'm') {
        const mother = people.find((item) => person.mother === item.name);

        if (mother) {
          sumAge += (person.born - mother.born);
          count++;
        }
      }
    } else {
      const mother = people.find((item) => person.mother === item.name);

      if (mother) {
        sumAge += (person.born - mother.born);
        count++;
      }
    }
  });

  return sumAge / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
