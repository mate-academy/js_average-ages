/* eslint-disable no-shadow */
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
function averageAgePeople(people) {
  const age = people.map(value => value.died - value.born);

  return age.reduce((a, b) => a + b) / age.length;
}

function calculateMenAverageAge(people, century) {
  const peopleFilter = people.filter(men => ((century > 0)
    ? men.sex === 'm' && Math.ceil(men.died * 0.01) === century
    : men.sex === 'm')
  );

  return averageAgePeople(peopleFilter);
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
  const womenFilter = people.filter(value => (withChildren !== undefined)
    ? people.find(child => child.mother === value.name)
    : value.sex === 'f'
  );

  return averageAgePeople(womenFilter);
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
  const child = people.filter(child => (onlyWithSon !== undefined)
    ? people.find(parents => child.mother === parents.name && child.sex === 'm')
    : people.find(perents => child.mother === perents.name)
  );

  const difference = child.map(child => (child.born - people.find(
    perents => perents.name === child.mother).born)
  );

  const age = difference.reduce((a, b) => a + b);

  return age / child.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
