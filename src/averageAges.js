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
  const peopleMen = people.filter(item => item.sex === 'm')
    .filter(item => century
      ? Math.ceil(item.died / 100) === century : true);

  const peopleAge = peopleMen.reduce(
    (acum, item) => acum + (item.died - item.born)
    , 0);

  return +(peopleAge / peopleMen.length).toFixed(2);
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
  const peopleWomen = people.filter(item => item.sex === 'f')
    .filter(item => withChildren
      ? people.some(items => item.name === items.mother) : true);

  const averageAge = peopleWomen.reduce((acumulator, item) =>
    acumulator + (item.died - item.born)
  , 0);

  return +(averageAge / peopleWomen.length).toFixed(2);
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
  const peopleAge = onlyWithSon
    ? people.filter(item => people.some(items => items.name === item.mother)
    && item.sex === 'm')
    : people.filter(item => people.some(items => items.name === item.mother));

  const avereAgeDiff = peopleAge.reduce(function(acum, child) {
    const mother = people.find(person => person.name === child.mother);
    const calculDiffer = child.born - mother.born;

    return acum + calculDiffer;
  }, 0);

  return +(avereAgeDiff / peopleAge.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
