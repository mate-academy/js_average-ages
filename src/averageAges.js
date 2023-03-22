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
function calculateMenAverageAge(people, century = 0) {
  let age = 0;
  const sex = people.filter(user => user.sex === 'm');
  const mans = century === 0
    ? sex
    : sex.filter(user => Math.ceil(user.died / 100) === century);

  age = mans.map(user => user.died - user.born);

  return +(age.reduce((sum, ageMan) => sum + ageMan, 0)
  / age.length).toFixed(2);
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
  const mothers = people.map(user => user.mother);
  const isMother = function(user) {
    for (let i = 0; i < mothers.length; i++) {
      if (user.name === mothers[i]) {
        return true;
      }
    }
  };
  const women = withChildren === true
    ? people.filter(isMother)
    : people.filter(user => user.sex === 'f');

  const age = women.map(user => user.died - user.born);

  return +(age.reduce((sum, ageWomen) => sum + ageWomen, 0)
  / age.length).toFixed(2);
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
  const age = people.map(user => user.born);
  const users = people.map(user => user.name);
  const mothers = people.map(user => user.mother);
  const difference = [];

  const usersSort = onlyWithSon === true
    ? people.filter(user => user.sex === 'm')
    : people;

  function findPearent(user) {
    for (let i = 0; i < mothers.length; i++) {
      if (user.mother === users[i]) {
        difference.push((age[i] - user.born) * -1);
      }
    }
  }

  usersSort.forEach((x) => {
    findPearent(x);
  });

  return +(difference.reduce((sum, ageSort) => sum + ageSort, 0)
  / difference.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
