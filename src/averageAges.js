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
  const men = people.filter((peoples) => peoples.sex === 'm');

  const AverageAge = men.reduce((prev, item) =>
    prev + (item.died - item.born), 0);

  const menInCentury = men.filter((mens) =>
    Math.ceil(mens.died / 100) === century);

  const averageAgeInCentury = menInCentury.reduce((prev, item) =>
    prev + (item.died - item.born), 0);

  return century === undefined
    ? AverageAge / men.length
    : averageAgeInCentury / menInCentury.length;
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
  const women = people.filter((peoples) => peoples.sex === 'f');

  const averageAge = women.reduce((prev, item) =>
    prev + (item.died - item.born), 0) / women.length;

  const womenWithCildren = women.filter(mother =>
    people.some(children =>
      children.mother === mother.name));

  const averageAgeMother = womenWithCildren.reduce((prev, item) =>
    prev + (item.died - item.born), 0) / womenWithCildren.length;

  return withChildren === true
    ? averageAgeMother
    : averageAge;

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
  let child = people.filter(children =>
    people.some(mother =>
      children.mother === mother.name));
  const son = child.filter((peoples) => peoples.sex === 'm');

  child = onlyWithSon === true
    ? son
    : child;

  const ages = child.map((kid) =>
    kid.born - people.find(women => women.name === kid.mother).born);

  const averageAge = ages.reduce((prev, item) => prev + item, 0) / child.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
