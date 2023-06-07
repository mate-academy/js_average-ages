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
  let countOfMen = 0;

  for (const person of people) {
    person.age = person.died - person.born;
    person.century = Math.ceil(person.died / 100);
  }

  return people.filter(person => (
    (person.sex === 'm' && person.century === century && (countOfMen += 1))
    || (person.sex === 'm' && !century && (countOfMen += 1))))
    .map(person => person.age)
    .reduce((ageA, ageB) => (ageA + ageB)) / countOfMen;
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
  let countOfWomen = 0;

  const women = people.filter(person => person.sex === 'f');

  return women.filter(isMother => {
    if (withChildren) {
      return people.some(person => person.mother === isMother.name
        && (countOfWomen += 1));
    } else {
      return people.filter(person => isMother.name === person.name
        && (countOfWomen += 1));
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
  let countOfChildren = 0;
  let sumAgeDiff = 0;
  let children = people.filter(person => person.mother !== 0);

  if (onlyWithSon) {
    children = children.filter(person => person.sex === 'm');
  }

  children.forEach(person => {
    const mother = people.find(isMother => isMother.name === person.mother);

    if (mother) {
      const ageDiff = (person.born - mother.born);

      sumAgeDiff += ageDiff;
      countOfChildren++;
    }
  });

  return sumAgeDiff / countOfChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
