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
  const men = people.filter(person => (
    person.sex === 'm'
    && (century
      ? century === Math.ceil(person.died / 100)
      : true)
  ));

  const menAges = men.map(person => person.died - person.born);

  const averageAge = menAges.reduce((age, average) => age + average, 0);

  return averageAge / men.length;
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
  const women = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name)
      : person.sex === 'f'
  );

  const womenAges = women.map(person => person.died - person.born);

  const averageAge = womenAges.reduce((age, average) => age + average);

  return averageAge / women.length;
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
  const children = people.filter(person => (
    people.find(mother => person.mother === mother.name))
    && (onlyWithSon
      ? person.sex === 'm'
      : true)
  );

  const childrenAges = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    const differenceAge = child.born - mother.born;

    return differenceAge;
  });

  const averageAge = childrenAges.reduce((age, average) => age + average);

  return averageAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
