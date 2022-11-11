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
  const men = people.filter(person => person.sex === 'm');

  const requiredMen = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return calcAvgAge(requiredMen);
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

  const reqiredWomen = withChildren
    ? women.filter(person => people.find(mother =>
      person.name === mother.mother
    ))
    : women;

  return calcAvgAge(reqiredWomen);
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
  const women = people.filter(person => person.sex === 'f');

  const men = people.filter(person => person.sex === 'm');

  const requiredChildren = onlyWithSon
    ? men.filter(person => women.find(mother =>
      person.mother === mother.name
    ))
    : people.filter(person => people.find(mother =>
      person.mother === mother.name
    ));

  const totalDiffAge = requiredChildren.reduce((prev, person) =>
    prev + (person.born - women
      .find(woman => woman.name === person.mother).born
    ), 0);

  const averageDiffAge = totalDiffAge / requiredChildren.length;

  return averageDiffAge;
}

function calcAvgAge(people) {
  return people.reduce((prev, person) =>
    prev + (person.died - person.born), 0) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
