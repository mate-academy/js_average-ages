'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = century ? people.filter((person) =>
    Math.ceil(person.died / 100) === century && person.sex === 'm')
    : people.filter((person) => person.sex === 'm');
  const arrAge = men.map(item => item.died - item.born);
  const sumAge = arrAge.reduce((a, b) => a + b);
  const menAverageAge = sumAge / men.length;

  return menAverageAge;
}
/**
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren ? people.filter((person) =>
    person.sex === 'f' && people.some((child) => child.mother === person.name))
    : people.filter((person) => person.sex === 'f');
  const arrAgeWomen = women.map(item => item.died - item.born);
  const sumAgeWomen = arrAgeWomen.reduce((a, b) => a + b);

  return sumAgeWomen / arrAgeWomen.length;
}
/*
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));
  const averageAgeDiff = children.reduce((a, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return a + ((child.born - mother.born));
  }, 0) / children.length;

  return Math.round(averageAgeDiff * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
