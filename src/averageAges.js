'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const filterMenbyCent = people.filter(men =>
    men.sex === 'm' && Math.ceil(men.died / 100) === century);
  const resMen = century
    ? filterMenbyCent
    : people.filter(men => men.sex === 'm');

  const averageMen = resMen.reduce((prev, person) =>
    (prev + (person.died - person.born)), 0) / resMen.length;

  // console.log('averageMen :', averageMen);

  return averageMen;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filterWombyChild = people.filter(women =>
    women.sex === 'f' && people.some(child => child.mother === women.name));
  const resWomen = withChildren
    ? filterWombyChild
    : people.filter(women => women.sex === 'f');

  const averageWomen = resWomen.reduce((prev, person) =>
    (prev + (person.died - person.born)), 0) / resWomen.length;

  // console.log('averageWomen :', averageWomen);

  return averageWomen;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const filterWombyChild = people.filter(women =>
    people.find(child => women.name === child.mother));
  let arrayChildren = [];

  (onlyWithSon !== undefined)
    ? arrayChildren = people.filter(child => filterWombyChild
      .find(women => child.mother === women.name)
      && (child.sex === 'm'))
    : arrayChildren = people.filter(child => filterWombyChild
      .find(women => women.name === child.mother));

  const diffAge = arrayChildren.map(child =>
    child.born - filterWombyChild.find(women =>
      women.name === child.mother).born);
  const avrDiffAge = diffAge.reduce((prev, person) =>
    (prev + person), 0) / diffAge.length;

  return avrDiffAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
