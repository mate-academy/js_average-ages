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
function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAvaregeAge(people) {
  return people.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const peopleFromCentry = (century)
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  return getAvaregeAge(getPeopleBySex(peopleFromCentry, 'm'));
}

function womenHaveChild(people, woman) {
  return people.find(person => person.mother === woman.name);
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
  const women = getPeopleBySex(people, 'f');

  const womenWithChild = (withChildren)
    ? women.filter(woman => womenHaveChild(people, woman))
    : women;

  return getAvaregeAge(womenWithChild);
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
  const women = getPeopleBySex(people, 'f');
  const men = getPeopleBySex(people, 'm');

  const womenWithChildren = (onlyWithSon)
    ? women.filter(woman => womenHaveChild(men, woman))
    : women.filter(woman => womenHaveChild(people, woman));

  const getAgeDiff = (choosePeople, WithChildren) => {
    const diff = choosePeople.map(person => {
      const isMother = WithChildren.find(woman =>
        woman.name === person.mother
      );

      return (!isMother) ? isMother : person.born - isMother.born;
    }).filter(a => a);

    return diff.reduce((sum, a) => (sum + a)) / diff.length;
  };

  const ageDifference = (onlyWithSon)
    ? getAgeDiff(men, womenWithChildren)
    : getAgeDiff(people, womenWithChildren);

  return ageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
