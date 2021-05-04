'use strict';

// const { map } = require("./people");

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100:
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = century
    ? people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');
  const ages = men.map(el => el.died - el.born);
  const averageAge = (ages.reduce((a, b) => a + b) / ages.length).toFixed(2);

  return +averageAge;
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
  const mothers = people.filter(el => el.mother).map(el => el.mother);
  const women = withChildren ? people.filter(el => mothers.includes(el.name))
    : people.filter(el => el.sex === 'f');
  const ages = women.map(el => el.died - el.born);
  const averageAge = (ages.reduce((a, b) => a + b) / ages.length).toFixed(2);

  return +averageAge;
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
  let children;

  onlyWithSon === true ? children = people.filter(el =>
    el.mother && el.sex === 'm') : children = people.filter(el => el.mother);

  const agesDiff = [];

  children.forEach(child => {
    const mother = people.filter(person => person.name === child.mother);

    return mother.length > 0 ? agesDiff.push(child.born - mother[0].born) : 0;
  });

  return +(agesDiff.reduce((a, b) => a + b) / agesDiff.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
