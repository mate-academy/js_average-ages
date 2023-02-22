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
  const filtered = arguments.length < 2
    ? people.filter(men => men.sex === 'm')
    : people.filter(men => Math.ceil(men.died / 100) === century
      && men.sex === 'm');

  const mapped = filtered.map(men => men.died - men.born);
  const sumed = mapped.reduce((sum, men) => sum + men);
  const averaged = (sumed / mapped.length).toFixed(2);

  return +averaged;
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
  const filtered = arguments.length < 2
    ? people.filter(women => women.sex === 'f')
    : people.filter(women => women.sex === 'f')
      .filter(mothers => people.map(person => person.mother)
        .some(mothersNamee => mothersNamee === mothers.name));

  const mapped = filtered.map(women => women.died - women.born);
  const sumed = mapped.reduce((sum, women) => sum + women);
  const averaged = (sumed / mapped.length).toFixed(2);

  return +averaged;
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
  const filtered = arguments.length < 2
    ? people.filter(child => child.mother !== null
      && people.find(person => person.name === child.mother))
    : people.filter(child => child.mother !== null
      && child.sex === 'm'
      && people.find(person => person.name === child.mother));

  const sumed = filtered.reduce((sum, child) => sum + child.born - (people
    .find(person => person.name === child.mother).born), 0);
  const averaged = (sumed / filtered.length).toFixed(2);

  return +averaged;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
