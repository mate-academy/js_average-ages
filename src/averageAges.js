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
const getAverageAge = (people) =>
  people.reduce((acc, el) => acc + (el.died - el.born), 0) / people.length;

function calculateMenAverageAge(people, century) {
  const onlyMen = century
    ? people.filter(men => men.sex === 'm'
      && Math.ceil(men.died / 100) === century)
    : people.filter(men => men.sex === 'm');

  return getAverageAge(onlyMen);
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
  // write code here
  const onlyWomen = withChildren
    ? people.filter(women => people.some(kid => women.name === kid.mother))
    : people.filter(women => women.sex === 'f');

  return getAverageAge(onlyWomen);
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
  // write code here
  const children = onlyWithSon
    ? people.filter(kid => people
      .some(mom => kid.sex === 'm' && mom.name === kid.mother))
    : people.filter(kid => people.some(mom => mom.name === kid.mother));

  const averageDifference = children.reduce((sum, kid) => {
    const mother = people.find(mom => kid.mother === mom.name);

    return sum + (kid.born - mother.born);
  }, 0) / children.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
