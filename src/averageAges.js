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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let num = 0;
  const sum = people.reduce(cb, 0);

  function cb(prev, person) {
    if (century) {
      if (person.sex === 'm' && Math.ceil(person.died / 100) === century) {
        num++;

        return prev + (person.died - person.born);
      }
    }

    if (!century) {
      if (person.sex === 'm') {
        num++;

        return prev + (person.died - person.born);
      }
    }

    return prev;
  }

  return sum / num;
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
  let num = 0;
  const sum = people.reduce(cb, 0);

  function cb(prev, person) {
    if (withChildren) {
      const motherName = person.name;

      if (person.sex === 'f'
      && people.some(potencialChild => potencialChild.mother === motherName)) {
        num++;

        return prev + (person.died - person.born);
      }
    }

    if (!withChildren) {
      if (person.sex === 'f') {
        num++;

        return prev + (person.died - person.born);
      }
    }

    return prev;
  }

  return sum / num;
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
  const arr = people.map(cb);

  function cb(potencialMother) {
    if (potencialMother.sex === 'f') {
      const motherName = potencialMother.name;

      return people.map(person => {
        if (!onlyWithSon) {
          if (person.mother === motherName) {
            return person.born - potencialMother.born;
          }

          return [];
        }

        if (onlyWithSon) {
          if (person.mother === motherName && person.sex === 'm') {
            return person.born - potencialMother.born;
          }

          return [];
        }
      });
    }

    return [];
  }

  const finalArr = arr.flat(Infinity);

  return finalArr.reduce((prev, item) => prev + item) / finalArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
