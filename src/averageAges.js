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
  const men = people.filter(person => person.sex === 'm');

  const allManAges = men.map(person => person.died - person.born);
  const sumAllManAges = allManAges.reduce((a, b) => a + b, 0);

  const inCentury = men.filter(person =>
    Math.ceil(person.died / 100) === century);
  const inCenturyAges = inCentury.map(person => person.died - person.born);
  const sumInCenturyAges = inCenturyAges.reduce((a, b) => a + b, 0);

  if (!century) {
    return sumAllManAges / men.length;
  }

  return sumInCenturyAges / inCentury.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
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
  const women = people.filter(person => person.sex === 'f');

  const allWomenAge = women.map(person => person.died - person.born);
  const sumAllWomenAge = allWomenAge.reduce((a, b) =>
    a + b, 0);

  const womenWithChildren = women.filter(person =>
    people.some(child => child.mother === person.name));
  const womenWithChildrenAge = womenWithChildren.map(person =>
    person.died - person.born);
  const sumWomenWithChildrenAge = womenWithChildrenAge.reduce((a, b) =>
    a + b, 0);

  if (!withChildren) {
    return sumAllWomenAge / women.length;
  }

  return sumWomenWithChildrenAge / womenWithChildren.length;
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
  const hasMother = people.filter(person =>
    people.some(one => one.name === person.mother));
  const diffWithAll = hasMother.map(person =>
    person.born - people.find(one => one.name === person.mother).born);
  const sumWithAll = diffWithAll.reduce((a, b) => a + b, 0);

  const manHasMother = people.filter(person =>
    people.some(one => one.name === person.mother)
    && person.sex === 'm');
  const diffWithSon = manHasMother.map(person =>
    person.born - people.find(one => one.name === person.mother).born);
  const sumWithSon = diffWithSon.reduce((a, b) => a + b, 0);

  if (!onlyWithSon) {
    return sumWithAll / diffWithAll.length;
  }

  return sumWithSon / diffWithSon.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
