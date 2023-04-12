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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const males = century
    ? people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century
    )
    : people.filter(person => person.sex === 'm');

  return males
    .reduce((sum, male) => sum + male.died - male.born, 0) / males.length;
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
  // write code here
  const females = people.filter(person => person.sex === 'f');

  const selectedFemales = withChildren
    ? females
      .filter(mother => {
        return people.some(child => child.mother === mother.name);
      })
    : females;

  return selectedFemales
    .reduce(
      (sum, woman) => sum + woman.died - woman.born
      , 0) / selectedFemales.length;
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
  // write code here
  const mothers = people.filter(person => {
    return people.some(child => child.mother === person.name);
  });

  const children = onlyWithSon
    ? people
      .filter(child => child.sex === 'm' && mothers
        .find(mother => mother.name === child.mother))
    : people
      .filter(child => mothers
        .find(mother => mother.name === child.mother));

  const ageGap = children.map(child => child.born - mothers
    .find(mother => mother.name === child.mother).born);

  return ageGap.reduce((sum, difference) => sum + difference) / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
