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
  const filteredMen = !century
    ? people.filter(user => user.sex === 'm')
    : people
      .filter(user => user.sex === 'm')
      .filter(user => Math.ceil(user.died / 100) === century);

  const ages = filteredMen.map(user => user.died - user.born);

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
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
  const filteredWomen = !withChildren
    ? people.filter(user => user.sex === 'f')
    : people.filter(user => user.sex === 'f')
      .filter(user => (people.filter(person => person.mother !== null)
        .map(person => person.mother)).includes(user.name));

  const ages = filteredWomen.map(user => user.died - user.born);

  return ages.reduce((sum, age) => sum + age, 0) / filteredWomen.length;
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
  const listUserName = people.map(user => user.name);
  const childrens = !onlyWithSon
    ? people.filter(user => listUserName.includes(user.mother))
    : people.filter(user => listUserName.includes(user.mother))
      .filter(user => user.sex === 'm');

  const ageDiffs = childrens
    .map(user => user.born - people
      .find(person => person.name === user.mother).born);

  const averageAgeDiff = ageDiffs
    .reduce((total, diff) => total + diff, 0) / ageDiffs.length;

  const result = Math.round(averageAgeDiff * 100) / 100;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
