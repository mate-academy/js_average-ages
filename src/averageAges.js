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
  const validPeople = century
    ? people.filter(
      person => person.sex === 'm' && century === Math.ceil(person.died / 100)
    )
    : people.filter(person => person.sex === 'm');

  const peopleAge = validPeople.map(person => person.died - person.born);
  const averageAgeTotal = peopleAge.reduce((total, age) => total + age, 0);

  return (averageAgeTotal / validPeople.length);
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
  const validPeople = withChildren
    ? people.filter(
      women => people.map(person => person.mother).includes(women.name)
    )
    : people.filter(person => person.sex === 'f');

  const peopleAge = validPeople.map(person => person.died - person.born);
  const averageAgeTotal = peopleAge.reduce((total, age) => total + age, 0);

  return (averageAgeTotal / validPeople.length);
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
  const mothers = people.filter(
    women => people.map(person => person.mother).includes(women.name)
  );

  const children = people.filter(
    person => mothers.map(mother => mother.name).includes(person.mother)
  );

  const validChildren = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifferenceArr = validChildren.map(
    child => child.born - mothers.find(
      mother => mother.name === child.mother
    ).born
  );

  const ageDifferenceTotal = ageDifferenceArr.reduce(
    (total, age) => total + age, 0
  );

  return ageDifferenceTotal / ageDifferenceArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
