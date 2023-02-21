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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const onlyMens = people.filter((men) => men.sex === 'm');
  const filterMens = onlyMens
    .filter((men) => Math.ceil(men.died / 100) === century);

  const calculateAges
    = onlyMens
      .map((yers) => yers.died - yers.born)
      .reduce((acc, curr) => acc + curr, 0) / onlyMens.length;

  const calculateAgesInCentury
    = filterMens
      .map((yers) => yers.died - yers.born)
      .reduce((acc, curr) => acc + curr, 0) / filterMens.length;

  return (!century) ? calculateAges : calculateAgesInCentury;
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
  const onlyWomen = people.filter((women) => women.sex === 'f');
  const womenWithChildren = onlyWomen
    .filter(woman => people.some(person => person.mother === woman.name));

  const calculateAges
    = onlyWomen
      .map(yers => yers.died - yers.born)
      .reduce((acc, val) => acc + val, 0) / onlyWomen.length;

  const calculateMother
    = womenWithChildren
      .map(yers => yers.died - yers.born)
      .reduce((acc, val) => acc + val, 0) / womenWithChildren.length;

  return (withChildren) ? calculateMother : calculateAges;
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
  const onlyWomen = people.filter((women) => women.sex === 'f');
  const children
    = people
      .filter(child => {
        const findChild = people.some(person => child.mother === person.name);

        return onlyWithSon ? findChild && child.sex === 'm' : findChild;
      });

  const averageAges = children.map(person => {
    const mother = onlyWomen.find(woman => {
      return woman.name === person.mother;
    });

    return person.born - mother.born;
  });

  return averageAges.reduce((acc, val) => acc + val, 0) / averageAges.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
