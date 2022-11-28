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
  const allMen = people.filter(person => person.sex === 'm');
  let men;

  century
    ? men = allMen.filter(person => Math.ceil(person.died / 100) === century)
    : men = allMen;

  return getAverageAge(men);
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
  const allWomen = people.filter(person => person.sex === 'f');
  let women;

  withChildren
    ? women = allWomen.filter(person => {
      return people.some(child => child.mother === person.name);
    })
    : women = allWomen;

  return getAverageAge(women);
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
    ? people.filter(child =>
      people.some(mother => child.mother === mother.name)
      && child.sex === 'm')
    : people.filter(child =>
      people.some(mother => child.mother === mother.name));

  const ages = children.map(child => child.born
    - people.find(mother => child.mother === mother.name).born);

  return ages.reduce((sum, age) => (sum + age), 0) / ages.length;
}

function getAverageAge(people) {
  const ages = people.map(person => person.died - person.born);

  return ages.reduce((sum, age) => (sum + age), 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
