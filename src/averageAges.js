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
  const men = century
    ? people.filter(person => person.sex === 'm')
      .filter(man => Math.ceil(man.died / 100) === century)

    : people.filter(person => person.sex === 'm');

  const age = men.map((man) => man.died - man.born);
  const sum = age.reduce((acc, year) => acc + year, 0);

  return sum / age.length || 0;
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
  const women = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.some(woman => woman.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const age = women.map((woman) => woman.died - woman.born);
  const sum = age.reduce((acc, year) => acc + year, 0);

  return sum / age.length || 0;
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
  let children = people.filter(child => child
  && people.find(person => child.mother === person.name));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDiff = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return ageDiff.reduce((acc, curr) => acc + curr) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
