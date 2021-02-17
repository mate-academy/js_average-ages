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
  const men = people.filter(el => el.sex === 'm');
  const sortCentury = el => Math.ceil(el.died / 100) === century;
  let sortedMenAges = [];
  const sortedMenAgesOnly = () => men.map(el => (el.died - el.born));
  const sortedMenAgesCentury = () => men
    .filter(sortCentury)
    .map(el => (el.died - el.born));

  sortedMenAges = arguments.length === 2
    ? sortedMenAgesCentury()
    : sortedMenAgesOnly();

  const numbersOfMen = sortedMenAges.length;
  const sumMenAge = sortedMenAges.reduce((acum, el) => acum + el, 0);
  const avarageMenAge = sumMenAge / numbersOfMen;

  return avarageMenAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const motersNames = people.map(el => el.mother);
  const women = people.filter(el => el.sex === 'f');
  const withChild = el => motersNames.includes(el.name);
  let sortedWomen = [];
  const sotedWomenAll = () => women.map(el => (el.died - el.born));
  const sortedWomenWithChildren = () => women
    .filter(withChild)
    .map(el => (el.died - el.born));

  sortedWomen = arguments.length === 2 && withChildren
    ? sortedWomenWithChildren()
    : sotedWomenAll();

  const numbersOfWomen = sortedWomen.length;
  const sumWomenAge = sortedWomen.reduce((acum, el) => acum + el, 0);
  const avarageWomenAge = sumWomenAge / numbersOfWomen;

  return avarageWomenAge;
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
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const allChildren = people.filter(
    el => people.find(mother => el.mother === mother.name)
  );
  const onlyBoys = allChildren.filter(child => child.sex === 'm');

  const children = onlyWithSon ? onlyBoys : allChildren;

  const sumOfDifference = children.reduce((sum, el) =>
    sum + (el.born - people.find(
      mother => el.mother === mother.name
    ).born)
  , 0);
  const avarageDifference = sumOfDifference / children.length;

  return avarageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
