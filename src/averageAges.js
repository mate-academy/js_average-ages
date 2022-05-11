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
  const men = people.filter(person => century ? Math.ceil(person.died / 100)
    === century && person.sex === 'm' : person.sex === 'm');
  const age = men.map(person => person.died - person.born);

  return age.reduce((a, b) => a + b) / age.length;
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
  const girl = people.filter(person => withChildren
    ? people.find(child => child.mother === person.name) : person.sex === 'f');

  const ages = girl.map(person => person.died - person.born);

  const averageAge = ages.reduce((a, b) => a + b, 0);

  return averageAge ? averageAge / ages.length : averageAge;
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
  const baby = people.filter(person => onlyWithSon
    ? people.find(mother => person.mother === mother.name && person.sex === 'm')
    : people.find(mother => person.mother === mother.name));

  const ages = baby.map(child => {
    const mother = people.find(person => child.mother === person.name);

    return child.born - mother.born;
  });

  const averageAge = ages.reduce((a, b) => a + b, 0);

  return averageAge / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
