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
    ? people.filter(info => info.sex === 'm'
    && Math.ceil(info.died / 100) === century)
    : people.filter(info => info.sex === 'm');

  return men.map(date => date.died - date.born)
    .reduce((sum, life) => sum + life) / men.length;
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
    ? people.filter(info => info.sex === 'f'
    && people.some(child => child.mother === info.name))
    : people.filter(info => info.sex === 'f');

  return women.map(date => date.died - date.born)
    .reduce((sum, life) => sum + life) / women.length;
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
  let children = [];

  onlyWithSon === undefined
    ? children = people.filter(person =>
      people.find(mother => person.mother === mother.name))
    : children = people.filter(person => people.find(mother =>
      mother.name === person.mother && person.sex === 'm'));

  const ageDiff = children.map(child => {
    const mother = people.find(person => child.mother === person.name);

    return child.born - mother.born;
  });

  const average = ageDiff.reduce((sum, age) => sum + age, 0);

  return average / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
