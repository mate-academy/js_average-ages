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
  const men = people.filter((person) => person.sex === 'm');
  const menCentury = century ? men.filter((man) =>
    Math.ceil(man.died / 100) === century) : men;

  const sumAge = menCentury.reduce((acc, man) =>
    acc + (man.died - man.born), 0);

  return sumAge / menCentury.length;
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
  const women = people.filter((person) => person.sex === 'f');
  const womenWithChildren = withChildren ? women.filter((woman) =>
    people.some((person) => person.mother === woman.name)
  ) : women;
  const sumAge = womenWithChildren.reduce((acc, woman) =>
    acc + (woman.died - woman.born), 0);
  const averageAge = sumAge / womenWithChildren.length;

  return averageAge;
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
  const motherWithSon = people.filter(child =>
    onlyWithSon
      ? people.find(woman => child.mother === woman.name) && child.sex === 'm'
      : people.find(woman => child.mother === woman.name)
  );

  return motherWithSon.reduce((sum, child) => sum
    + child.born - people.find((woman) =>
    child.mother === woman.name).born, 0) / motherWithSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
