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
  const allMen = people.filter((element) => element.sex === 'm');
  const menOfTheCentury = allMen.filter((element) =>
    Math.ceil(element.died / 100) === century);
  let men;

  arguments.length === 1
    ? men = allMen
    : men = menOfTheCentury;

  const ages = men.map((element) => element.died - element.born);

  const average = +(ages.reduce((a, b) => a + b) / men.length).toFixed(2);

  return average;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter((element) => element.sex === 'f');
  const womenWithChildren = people.filter((mother) => {
    return people.some(child => mother.name === child.mother);
  });

  let women;

  arguments.length === 1
    ? women = allWomen
    : women = womenWithChildren;

  const ages = women.map((element) => element.died - element.born);
  const average = +(ages.reduce((a, b) => a + b) / women.length)
    .toFixed(2);

  return average;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const motherWithChild = people.filter((mother) => {
    return people.some((child) => mother.name === child.mother);
  }).sort((a, b) => a.name.localeCompare(b.name));
  let children;

  const boysAndGirls = people.filter((child) => {
    return people.some((mother) => child.mother === mother.name);
  }).sort((a, b) => a.mother.localeCompare(b.mother));

  const boys = boysAndGirls.filter(boy => boy.sex === 'm');

  onlyWithSon ? children = boys : children = boysAndGirls;

  const ageOfBirth = children.map((child) => {
    return child.born - motherWithChild
      .find(mother => mother.name === child.mother).born;
  });

  const average = +(ageOfBirth.reduce((a, b) => a + b) / children.length)
    .toFixed(2);

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
