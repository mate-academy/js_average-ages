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
  const menList = century === undefined
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  const sumAge = menList.reduce((acc, person) =>
    acc + person.died - person.born, 0);

  return sumAge / menList.length;
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
  let womanList = people.filter(person => person.sex === 'f');

  if (withChildren) {
    womanList = womanList.filter(person =>
      people.some(woman =>
        woman.mother === person.name
      ));
  }

  const sumAge = womanList.reduce((acc, person) =>
    acc + person.died - person.born, 0);

  return sumAge / womanList.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  let womanList = people.filter(person =>
    person.sex === 'f'
      && people.some(woman =>
        woman.mother === person.name
      ));

  if (onlyWithSon) {
    womanList = womanList.filter(person =>
      people.some(human =>
        human.mother === person.name && human.sex === 'm'));
  }

  const summaryData = [];

  womanList.forEach(woman => {
    const children = onlyWithSon !== undefined
      ? people.filter(person =>
        person.mother === woman.name && person.sex === 'm')
      : people.filter(person =>
        person.mother === woman.name);
    const ageDifference = children.map(child => (child.born - woman.born));

    summaryData.push(...ageDifference);
  });

  return summaryData.reduce((acc, elem) =>
    (acc + elem), 0) / summaryData.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
