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
  const filteredMen = people.filter(user => century
    ? user.sex === 'm' && Math.ceil(user.died / 100) === century
    : user.sex === 'm');

  return averageYears(filteredMen);
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
  const filteredWomen = people.filter((user) =>
    withChildren
      ? user.sex === 'f' && people.filter(person => person.mother !== null)
        .map(person => person.mother).includes(user.name)
      : user.sex === 'f'
  );

  return averageYears(filteredWomen);
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
  const childrens = people.filter((user) =>
    onlyWithSon
      ? listUserName.includes(user.mother) && user.sex === 'm'
      : listUserName.includes(user.mother)
  );

  return averageYears(childrens, people);
}

function averageYears(filteredUsers, allUsers) {
  const ages = filteredUsers.map(user =>
    allUsers
      ? user.born - allUsers.find(person => person.name === user.mother).born
      : user.died - user.born);

  return ages.reduce((sum, age) => sum + age, 0) / filteredUsers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
