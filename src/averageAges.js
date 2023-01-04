'use strict';

/**
 * { 'name': 'Carolus Haverbeke', 'sex': 'm', 'born': 1832, 'died': 1905,
 * 'father': 'Carel Haverbeke', 'mother': 'Maria van Brussel' },
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
  let avarageAge = 0;
  let totalAge = 0;
  let menToCount;
  const men = people.filter(person => person.sex === 'm');

  century
    ? menToCount = men.filter(person =>
      Math.ceil(person.died / 100) === century
    )
    : menToCount = men;

  totalAge = menToCount.reduce((sum, person) =>
    sum + person.died - person.born
  , 0
  );

  avarageAge = totalAge / menToCount.length;

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
 * { 'name': 'Carolus Haverbeke', 'sex': 'm', 'born': 1832, 'died': 1905,
 * 'father': 'Carel Haverbeke', 'mother': 'Maria van Brussel' },
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let totalAge = 0;
  let avarageAge = 0;
  let womenToCount;
  const women = people.filter(person => person.sex === 'f');

  withChildren
    ? womenToCount = women.filter(person =>
      (people.some(child => child.mother === person.name)))
    : womenToCount = women;

  totalAge = womenToCount.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0);

  avarageAge = totalAge / womenToCount.length;

  return avarageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *  { 'name': 'Carolus Haverbeke', 'sex': 'm', 'born': 1832, 'died': 1905,
 * 'father': 'Carel Haverbeke', 'mother': 'Maria van Brussel' },
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let childrenToCount = [];
  let totalAgeDiff = 0;
  let averageAgeDiff = 0;
  const children = people.filter(person =>
    people.some(({ name }) => person.mother === name));

  onlyWithSon
    ? childrenToCount = children.filter(person => person.sex === 'm')
    : childrenToCount = children;

  totalAgeDiff = childrenToCount.reduce(
    (difference, person1) =>
      difference
      + person1.born
      - people.find(person2 => person1.mother === person2.name).born
    , 0
  );

  averageAgeDiff = totalAgeDiff / childrenToCount.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
