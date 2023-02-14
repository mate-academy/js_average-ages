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
  let men = people.filter(obj => {
    return obj['sex'] === 'm';
  });

  if (century) {
    men = men.filter(obj => Math.ceil(obj.died / 100) === century);
  };

  const totalAge = men.reduce((total, obj) => {
    return total + (obj.died - obj.born);
  }, 0);

  return totalAge / men.length;
};
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
  // write code here
  let women = people.filter(obj => {
    return obj['sex'] === 'f';
  });

  if (withChildren) {
    women = women.filter(mother => {
      return people.some(child => mother.name === child.mother);
    });
  };

  const totalAge = women.reduce((total, obj) => {
    return total + (obj.died - obj.born);
  }, 0);

  return totalAge / women.length;
};

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
  const children = people.filter(({ sex, mother }) => onlyWithSon
    ? sex === 'm' && people.find(p => p.name === mother)
    : people.find(p => p.name === mother));

  const momGaveBirthAgeSum = children.reduce((sum, child) => {
    const motherObj = people.find(mother => child.mother === mother.name);

    if (motherObj) {
      return sum + (child.born - motherObj.born);
    } else {
      return sum;
    }
  }, 0);

  return momGaveBirthAgeSum / children.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
