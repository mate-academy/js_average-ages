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
function averageAge(people) {
  return people.reduce(
    (acc, curr) => acc + (curr.died - curr.born), 0
  ) / people.length;
}

function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(
      person => person.sex === 'm'
        && Math.ceil(person.died / 100) === century
    )
    : people.filter(
      person => person.sex === 'm'
    );

  return averageAge(men);
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
  // const women = people.filter(
  //   person => person.sex === 'f'
  // );
  // const mothers = women.filter(
  //   person => people.some(human => human.mother === person.name)
  // );

  const women = withChildren
    ? people.filter(
      person => person.sex === 'f'
        && people.some(human => human.mother === person.name)
    )
    : people.filter(
      person => person.sex === 'f'
    );

  return averageAge(women);
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
  const children = onlyWithSon
    ? people.filter(child => child.mother
      && people.some(person => person.name === child.mother)
      && child.sex === 'm')
    : people.filter(child => child.mother
      && people.some(person => person.name === child.mother));

  return children.reduce((acc, curr) => (
    acc + curr.born - people.find(person => (
      person.name === curr.mother)).born), 0
  ) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
