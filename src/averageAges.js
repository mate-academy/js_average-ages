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

// helper fn
function isMan(person) {
  return person.sex === 'm';
}

// function sumAllAges(prev, next) {
//   return prev + (next.died - next.born);
// }

function sumAllAges(people) {
  return people.reduce((sum, person) => sum + (person.died - person.born), 0);
}

function isWoman(person) {
  return person.sex === 'f';
};

function isMother(person, index, arr) {
  return arr.some(child => child.mother === person.name);
};

function haveDiedInCentury(person, century) {
  return (century) ? (Math.ceil(person.died / 100)) === century : true;
}

function isChild(person, index, arr) {
  return arr.some(child => child.name === person.mother);
};

function calculateMenAverageAge(people, century) {
  const men = people
    .filter(person => isMan(person) && haveDiedInCentury(person, century));

  // return (men.reduce(sumAllAges, 0) / men.length);
  return sumAllAges(men) / men.length;
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
  const woman = withChildren
    ? people.filter((person, index, arr) => isMother(person, index, arr))
    : people.filter(isWoman);

  // return (woman.reduce(sumAllAges, 0) / woman.length);
  return sumAllAges(woman) / woman.length;
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
  const children = (onlyWithSon)
    ? people.filter(
      (person, index, arr) => isMan(person) && isChild(person, index, arr)
    )
    : people.filter((person, index, arr) => isChild(person, index, arr));

  return children.reduce((sum, child) => {
    const mother = people.find(person => person.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
