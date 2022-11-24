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
  let count = 0;
  let result;

  if (century) {
    result = people.reduce((a, b) => {
      if (b.sex === 'm' // Sex is male && death in the specified century
            && (Math.ceil(b.died / 100) === century)) {
        count++;

        return a + b.died - b.born;
      } else {
        return a;
      }
    }, 0);
  } else {
    result = people.reduce((a, b) => {
      if (b.sex === 'm') { // Sex is male
        count++;

        return a + b.died - b.born;
      } else {
        return a;
      }
    }, 0);
  }

  return result / (count > 0 ? count : 1);
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
  let count = 0;
  let result;

  if (withChildren) {
    result = people.reduce((a, b) => {
      if (b.sex === 'f' // Sex is female && is a mother
            && people.findIndex(person => person.mother === b.name) !== -1) {
        count++;

        return a + b.died - b.born;
      } else {
        return a;
      }
    }, 0);
  } else {
    result = people.reduce((a, b) => {
      if (b.sex === 'f') { // Sex is female
        count++;

        return a + b.died - b.born;
      } else {
        return a;
      }
    }, 0);
  }

  return result / (count > 0 ? count : 1);
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
  let count = 0;
  let result;

  if (onlyWithSon) {
    result = people.reduce((a, b) => {
      const valueToAdd = people.reduce((x, y) => {
        if (y.mother === b.name && y.sex === 'm') {
          count++;

          return x + y.born - b.born;
        }

        return x;
      }, 0);

      return a + valueToAdd;
    }, 0);
  } else {
    result = people.reduce((a, b) => {
      const valueToAdd = people.reduce((x, y) => {
        if (y.mother === b.name) {
          count++;

          return x + y.born - b.born;
        }

        return x;
      }, 0);

      return a + valueToAdd;
    }, 0);
  }

  return result / (count > 0 ? count : 1);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
