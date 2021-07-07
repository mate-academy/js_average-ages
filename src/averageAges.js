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
  const men = people.filter(({ died, sex }) => {
    if (century) {
      return sex === 'm' && Math.ceil(died / 100) === century;
    } else {
      return sex === 'm';
    }
  });

  const yearsLived = men.map(({ died, born }) => died - born);

  const menAverageAge = yearsLived.reduce((generalAge, age) => {
    return generalAge + age;
  });

  return menAverageAge / yearsLived.length;
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
  const women = people.filter(({ sex, name }) => {
    if (withChildren) {
      return sex === 'f' && people.some(({ mother }) => {
        return mother === name;
      });
    } else {
      return sex === 'f';
    }
  });

  const yearsLived = women.map(({ died, born }) => died - born);

  const womenAverageAge = yearsLived.reduce((generalAge, age) => {
    return generalAge + age;
  });

  return womenAverageAge / yearsLived.length;
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
  const childrens = people.filter(({ mother, sex }) => {
    if (onlyWithSon) {
      return people.some(({ name }) => {
        return name === mother && sex === 'm';
      });
    } else {
      return people.some(({ name }) => name === mother);
    }
  });

  const ageDifference = childrens.map(({ born, mother }) => {
    return born - people.find(({ name }) => name === mother).born;
  });

  const averageAge = ageDifference.reduce((prev, item) => prev + item);

  return averageAge / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
