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

  const countedMen = people
    .filter(person => person.sex === 'm')
    .filter(man => century !== undefined
      ? Math.ceil(man.died / 100) === century
      : true
    );

  const sumOfMenAge = countedMen
    .reduce((sum, { born, died }) => sum + died - born, 0);

  return sumOfMenAge / countedMen.length;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const countedWemen = people
    .filter(person => person.sex === 'f')
    .filter(woman => withChildren
      ? people.some(person => person.mother === woman.name)
      : true
    );

  const sumOfWemenAge = countedWemen
    .reduce((sum, { born, died }) => sum + died - born, 0);

  return sumOfWemenAge / countedWemen.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = people
    .filter(person => people.some(human => human.name === person.mother))
    .filter(child => onlyWithSon
      ? child.sex === 'm'
      : true
    );
  const childrenBornYears = children.reduce((sum, { born }) => sum + born, 0);

  const mothers = children.map(child => {
    return people.find(person => person.name === child.mother);
  });
  const mothersBornYears = mothers.reduce((sum, { born }) => sum + born, 0);

  return (childrenBornYears - mothersBornYears) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
