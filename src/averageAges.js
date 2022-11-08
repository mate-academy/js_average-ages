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
  const men = people.filter(person => (century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'));

  return averageAgePeople(men);
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
  const women = people.filter(person => (withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f'));

  return averageAgePeople(women);
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
  const children = people.filter(child => (onlyWithSon
    ? people.find(mother => child.mother === mother.name && child.sex === 'm')
    : people.find(mother => child.mother === mother.name)));

  const totalAge = children.reduce((differenceSum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return differenceSum + (child.born - mother.born);
  }, 0);

  return totalAge / children.length;
}

function averageAgePeople(people) {
  const age = people.map(value => value.died - value.born);

  return age.reduce((a, b) => a + b) / age.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
