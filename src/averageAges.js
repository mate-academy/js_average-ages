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
  const men = (century)
    ? people.filter(person =>
      person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menYear = men.map(man => {
    return man.died - man.born;
  });

  const averageAge
  = +((menYear.reduce((a, b) => a + b)) / menYear.length).toFixed(2);

  return averageAge;
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
  const women = people.filter(person => person.sex === 'f');
  const womanYear = women.map(man => {
    return man.died - man.born;
  });
  const averageAge
  = +((womanYear.reduce((a, b) => a + b)) / womanYear.length).toFixed(2);

  if (withChildren) {
    const motherWith = women.filter(woman => people.find(person =>
      (person.mother && woman.name === person.mother)));

    const womanYearWith = motherWith.map(man => man.died - man.born);

    const averageAgeWith
    = +((womanYearWith.reduce((a, b) => a + b))
    / womanYearWith.length).toFixed(2);

    return averageAgeWith;
  }

  return averageAge;
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
  const women = people.filter(person => person.sex === 'f');
  const mothers = women.filter(woman => people.find(person =>
    (person.mother && woman.name === person.mother)));

  const childrens = (onlyWithSon)
    ? people.filter(person => mothers.find(mother =>
      (mother.name && person.mother === mother.name && person.sex === 'm')))
    : people.filter(person => mothers.find(mother =>
      (mother.name && person.mother === mother.name)));

  const difference = childrens.map(children => mothers.map(mother =>
    (children.mother === mother.name) ? children.born - mother.born : 0));

  const result = +(difference
    .map(item => (item.reduce((a, b) => a + b, 0)))
    .reduce((a, b) => a + b, 0) / childrens.length)
    .toFixed(2);

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
