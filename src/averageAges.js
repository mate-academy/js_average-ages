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
  let count = 0;

  const men = century
    ? people.filter(person => (Math.ceil(person.died / 100) === century)
      && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  const sumAge = men.reduce((total, person) => {
    let age = 0;

    age = person.died - person.born;
    count++;

    return total + age;
  }, 0);

  return sumAge / count;
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
  let count = 0;

  const women = withChildren
    ? people.filter(person => person.sex === 'f').filter((person) => {
      return people.some(el => el.mother === person.name);
    })
    : people.filter(person => person.sex === 'f');

  const sumAge = women.reduce((total, person) => {
    let age = 0;

    age = person.died - person.born;
    count++;

    return total + age;
  }, 0);

  return sumAge / count;
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
  let count = 0;

  const women = people.filter(person => person.sex === 'f');

  const sumAgeMaternity = women.reduce((total, person) => {
    let diffAge = 0;

    people.forEach(child => {
      if (onlyWithSon) {
        if (child.mother === person.name && child.sex === 'm') {
          diffAge += child.born - person.born;
          count++;
        }
      } else if (child.mother === person.name) {
        diffAge += child.born - person.born;
        count++;
      }
    });

    return total + diffAge;
  }, 0);

  return sumAgeMaternity / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
