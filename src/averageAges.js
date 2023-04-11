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

// helper functions to map ages and get average:
function averageAgeOfObjectsArray(people) {
  const agesMap = people.map(person => person.died - person.born);

  return agesMap.reduce((a, b) => a + b) / agesMap.length;
}

function averageAgeOfNumbersArray(ages) {
  return ages.reduce((a, b) => a + b) / ages.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter(man =>
    century // !== undefined
      ? man.sex === 'm' && Math.ceil(man.died / 100) === century
      : man.sex === 'm'
  );

  return averageAgeOfObjectsArray(men);
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
  const women = people.filter(woman =>
    withChildren // !== undefined
      ? people.some(child => child.mother === woman.name)
      : woman.sex === 'f'
  );

  return averageAgeOfObjectsArray(women);
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
  const children = people.filter(child =>
    people.some(woman =>
      onlyWithSon // !== undefined
        ? woman.name === child.mother && child.sex === 'm'
        : woman.name === child.mother
    )
  );

  const ageDiff = children.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return child.born - mother.born;
  });

  return averageAgeOfNumbersArray(ageDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
