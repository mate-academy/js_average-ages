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
  let result = 0;
  let arr;

  if (century !== undefined) {
    arr = people.filter(man => man.sex === 'm')
      .filter(manDied => Math.ceil(manDied.died / 100) === century);

    arr.forEach(person => {
      result += person.died - person.born;

      return person;
    });

    return result / arr.length;
  } else {
    arr = people.filter(man => man.sex === 'm');

    arr.forEach(person => {
      result += person.died - person.born;

      return person;
    });

    return result / arr.length;
  }
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
  // write code here
  let result = 0;
  let arr;

  if (withChildren !== undefined) {
    arr = people.filter(women => women.sex === 'f')
      .filter(mama => people.some(mam => mam.mother === mama.name) === true);

    arr.forEach(person => {
      result += person.died - person.born;

      return person;
    });

    return result / arr.length;
  } else {
    arr = people.filter(women => women.sex === 'f');

    arr.forEach(person => {
      result += person.died - person.born;

      return person;
    });

    return result / arr.length;
  }
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  // write code here
  let result = 0;
  let count = 0;
  let arr;

  if (onlyWithSon !== undefined) {
    arr = people.filter(women => women.sex === 'f')
      .filter(mama => people
        .some(child => (child.mother === mama.name
          && child.sex === 'm') === true));

    arr.forEach(person => {
      people.forEach(child => {
        if (child.mother === person.name && child.sex === 'm') {
          result += child.born - person.born;
          count++;
        }

        return child;
      });

      return person;
    });

    return result / count;
  } else {
    arr = people.filter(women => women.sex === 'f')
      .filter(mama => people
        .some(child => (child.mother === mama.name) === true));

    arr.forEach(person => {
      people.forEach(child => {
        if (child.mother === person.name) {
          result += child.born - person.born;
          count++;
        }

        return child;
      });

      return person;
    });

    return result / count;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
