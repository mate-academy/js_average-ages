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
  let allMen = people.filter(person => person.sex === 'm');
  const menCentury = allMen
    .filter(person => Math.ceil(person.died / 100) === century);

  allMen = !century ? allMen : menCentury;

  const averageAge = allMen
    .map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b, 0) / allMen.length;

  return averageAge;
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
  let allWomen = people.filter(person => person.sex === 'f');
  const allWomenWithChildren = allWomen
    .filter(mother => people.some(kid => kid.mother === mother.name));

  allWomen = !withChildren ? allWomen : allWomenWithChildren;

  const averageAge = allWomen
    .map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b, 0) / allWomen.length;

  return averageAge;
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
  let children = people
    .filter(kid => people.some(mother => kid.mother === mother.name));

  const sons = children.filter(son => son.sex === 'm');

  children = !onlyWithSon ? children : sons;

  const ageDifferent = children
    .map(kid => kid.born - people
      .find(mother => mother.name === kid.mother).born);

  const averageDifferentAge = ageDifferent
    .reduce((firstDifferent, secondDifferent) =>
      firstDifferent + secondDifferent, 0) / children.length;

  return averageDifferentAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
