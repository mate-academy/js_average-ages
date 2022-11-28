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
  const getPeople
      = people
        .filter(person => person.sex === 'm'
      && (century ? (Math.ceil(person.died / 100) === century) : !century));

  return averageAge(getPeople);
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
  const getPeople
  = people
    .filter(person => person.sex === 'f'
  && (withChildren
    ? people
      .some(child => child.mother === person.name)
    : !withChildren));

  return averageAge(getPeople);
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
  const getPeople
  = onlyWithSon
    ? people
      .filter(person => person.sex === 'm')
    : people;

  let len = 0;

  const sum = getPeople.reduce((ttl, person) => {
    const mother = people.find(m => m.name === person.mother);

    if (mother) {
      len++;

      return ttl + person.born - mother.born;
    }

    return ttl;
  }, 0);

  return sum / len;
}

function averageAge(people) {
  return people.reduce((sum, person) => sum + person.died - person.born, 0)
    / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
