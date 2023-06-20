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
    ? people.filter(person => person.sex === 'm'
  && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menAverageAge = men.reduce((total, man) =>
    total + (man.died - man.born) / men.length, 0
  );

  return menAverageAge;
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
    ? people.filter(woman => woman.sex === 'f'
  && people.some(person => person.mother === woman.name))
    : people.filter(woman => woman.sex === 'f');

  const womenAverageAge = women.reduce((total, woman) =>
    total + (woman.died - woman.born) / women.length, 0
  );

  return womenAverageAge;
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
    ? people.filter(child => child.sex === 'm'
    && people.some(woman => woman.name === child.mother))
    : people.filter(child =>
      people.some(woman => woman.name === child.mother));

  const averageAgeDiff = children.reduce((total, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return (total + (child.born - mother.born) / children.length);
  }, 0);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
