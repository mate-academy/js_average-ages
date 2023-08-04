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
  let men = [];

  if (century) {
    men = people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);
  } else {
    men = people.filter(person => person.sex === 'm');
  }

  const totalAge = men.reduce((total, person) =>
    total + (person.died - person.born), 0);

  return totalAge / men.length;
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
  let women = [];

  if (withChildren) {
    women = people.filter(person => person.sex === 'f'
      && people.some(parent => parent.mother === person.name));
  } else {
    women = people.filter(person => person.sex === 'f');
  }

  const totalAge = women.reduce((total, person) =>
    total + (person.died - person.born), 0);

  return totalAge / women.length;
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
  const family = onlyWithSon
    ? people.filter(person =>
      people.some(child => child.name === person.mother) && person.sex === 'm')
    : people.filter(person =>
      people.some(child => child.name === person.mother));

  let avgAge = 0;

  family.forEach(person => {
    const women = people.find(mother => mother.name === person.mother);

    if (women) {
      const totalAge = person.born - women.born;

      avgAge += totalAge;
    }
  });

  return avgAge / family.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
