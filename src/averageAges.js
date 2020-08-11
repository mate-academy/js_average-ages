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
  let peopleCounts = 0;

  return people.reduce((sum, pepl) => {
    if (pepl.sex === 'm'
    && (Math.ceil(pepl.died / 100) === century || !century)) {
      return (sum * peopleCounts + (pepl.died - pepl.born)) / ++peopleCounts;
    } else {
      return sum;
    }
  }, 0, century);
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
  let peopleCounts = 0;
  const hasChild = (pepl) => {
    return people.some(supposedChild => {
      if (supposedChild.mother === pepl.name) {
        return true;
      }
    });
  };

  return people.reduce((sum, pepl) => {
    if ((pepl.sex === 'f' && withChildren && hasChild(pepl))
      || (pepl.sex === 'f' && !withChildren)) {
      return (sum * peopleCounts + (pepl.died - pepl.born)) / ++peopleCounts;
    } else {
      return sum;
    }
  }, 0, withChildren);
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
  let counts = 0;

  return people.reduce((sum, pepl) => {
    if (onlyWithSon && pepl.sex === 'f') {
      return sum;
    }

    let mother;
    let found = false;

    people.map(supposedMother => {
      if (supposedMother.name === pepl.mother) {
        found = true;
        mother = supposedMother;
      }
    });

    if (found) {
      return (sum * counts + (pepl.born - mother.born)) / ++counts;
    } else {
      return sum;
    }
  }, 0, onlyWithSon);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
