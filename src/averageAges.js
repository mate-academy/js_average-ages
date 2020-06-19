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
  function getCentury(human) {
    return Math.ceil(human.died / 100);
  };

  function getAverage(number) {
    return +(number.reduce((a, b) => a + b, 0) / number.length).toFixed(2);
  };

  const men = people.filter(
    person => century
      ? person.sex === 'm' && getCentury(person) === century
      : person.sex === 'm'
  );
  const years = men.map(year => year.died - year.born);
  const averageYears = getAverage(years);

  return averageYears;
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
  function getAverage(number) {
    return +(number.reduce((a, b) => a + b, 0) / number.length).toFixed(2);
  };

  function isMama(humans) {
    return humans.filter(woman => {
      return humans.some(child => woman.name === child.mother);
    });
  };

  const women = people.filter(person => person.sex === 'f');
  const female = withChildren ? isMama(people) : women;
  const years = female.map(year => year.died - year.born);
  const averageYears = getAverage(years);

  return averageYears;
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
  function childrens(parent) {
    return parent.filter(child => {
      return people.find(mama => child.mother === mama.name);
    });
  };

  function getAverage(number) {
    return +(number.reduce((a, b) => a + b, 0) / number.length).toFixed(2);
  };

  const withMama = people.filter(name => name.mother !== null);
  const childArray = onlyWithSon
    ? childrens(withMama.filter(son => son.sex === 'm'))
    : childrens(withMama);

  const differenceInAges = childArray.map(child => {
    return child.born - people.find(mama => child.mother === mama.name).born;
  });
  const averageYears = getAverage(differenceInAges);

  return averageYears;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
