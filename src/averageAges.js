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
  const men = people.filter(({ sex }) => sex === 'm');

  if (century) {
    const filteredByCentury = men.filter(({ died }) => {
      return Math.ceil(died / 100) === century;
    });

    const result = filteredByCentury.reduce((sum, { died, born }) => {
      const age = died - born;

      return Math.round((sum + age));
    }, 0);

    return result / filteredByCentury.length;
  }

  const count = men.reduce((sum, { died, born }) => {
    const age = died - born;

    return Math.round((sum + age));
  }, 0);

  return count / men.length;
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
  const testArray = [];
  const women = people.filter(({ sex }) => sex === 'f');

  if (withChildren) {
    const mothers = women.filter(({ name }) => {
      if (testArray.includes(name)) {
        return false;
      }
      testArray.push(name);

      return people.find(({ mother }) => name === mother);
    });

    const result = mothers.reduce((sum, { died, born }) => {
      const age = died - born;

      return Math.round((sum + age));
    }, 0);

    return result / mothers.length;
  }

  const count = women.reduce((sum, { died, born }) => {
    const age = died - born;

    return Math.round((sum + age));
  }, 0);

  return count / women.length;
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
  const women = people.filter(({ sex }) => sex === 'f');
  const testArray = [];
  const mothers = women.filter(({ name }) => {
    if (testArray.includes(name)) {
      return false;
    }
    testArray.push(name);

    return people.find(({ mother }) => name === mother);
  });

  let children = people.filter(({ mother }) => {
    return mothers.find(({ name }) => mother === name);
  });
  const result = [];

  if (onlyWithSon) {
    children = children.filter(({ sex }) => sex === 'm');
  }

  mothers.forEach(({ name: motherName, born: motherBorn }) => {
    children.forEach(({ mother: nameOfChildMother, born: childBorn }) => {
      if (motherName === nameOfChildMother) {
        result.push(childBorn - motherBorn);
      }
    });

    return children;
  });

  const finalResult = result.reduce((prev, item) => prev + item);

  return finalResult / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
