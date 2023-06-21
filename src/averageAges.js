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
  const maleFiltered = people.filter((person) => person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true));

  const maleAge = maleFiltered.map((person) => person.died - person.born);

  return countAverageAge(maleAge);
}

function countAverageAge(ages) {
  const avarageAge = ages.reduce((totalAge, age) =>
    totalAge + age, 0) / ages.length;

  return avarageAge;
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
  const women = people.filter(person => person.sex === 'f');

  const countOfWomen = women.filter(isMother =>
    withChildren
      ? people.some(person => person.mother === isMother.name)
      : people.some(person => isMother.name === person.name)
  )
    .reduce(count => count + 1, 0);

  return women.filter(isMother => {
    if (withChildren) {
      return people.some(person => person.mother === isMother.name);
    } else {
      return people.some(person => isMother.name === person.name);
    }
  })
    .map(isMother => (isMother.died - isMother.born))
    .reduce((ageA, ageB) => (ageA + ageB)) / countOfWomen;
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
  let children = people.filter(person => person.mother !== 0);

  if (onlyWithSon) {
    children = children.filter(person => person.sex === 'm');
  }

  children = children.map(person => {
    const mother = people.find(isMother => isMother.name === person.mother);

    if (mother) {
      const ageDiff = (person.born - mother.born);

      return ageDiff;
    }
  })
    .filter(ageDiff => ageDiff !== undefined);

  const countOfChildren = children.reduce((count) => (count + 1), 0);
  const sumAgeDiff = children.reduce((sum, ageDiff) => (sum + ageDiff), 0);

  return sumAgeDiff / countOfChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
