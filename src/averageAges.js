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
  const men = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const ages = men.map(person => person.died - person.born);
  const sum = ages.reduce((total, age) => total + age, 0);
  const average = sum / ages.length;

  return average;
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
    && people.find(x => x.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const ages = women.map(person => person.died - person.born);
  const sum = ages.reduce((accumulator, age) => accumulator + age, 0);
  const average = sum / ages.length;

  return average;
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
  let sumAgeDiff = 0;
  let count = 0;

  for (let i = 0; i < people.length; i++) {
    const person = people[i];
    const mother = people.find(p => p.name === person.mother);

    if (mother && (!onlyWithSon || (onlyWithSon && person.sex === 'm'))) {
      const ageDiff = mother.born - person.born;

      sumAgeDiff += ageDiff;
      count++;
    }
  }

  if (count === 0) {
    return 0;
  }

  return (sumAgeDiff / count) * -1;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
