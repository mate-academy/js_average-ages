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
  const arrMen = people.filter(person => person.sex === 'm');

  const calcCenturyAge = function() {
    const arrMenCentury = arrMen.filter(person => Math.ceil(person.died / 100)
    === century);

    const initialValue = 0;
    const sumAgeMen = arrMenCentury.reduce((a, b) => a + (b.died - b.born),
      initialValue);

    return Number((sumAgeMen / arrMenCentury.length).toFixed(2));
  };

  const calcAge = function() {
    const initialValue = 0;
    const sumAgeMen = arrMen.reduce((a, b) => a + (b.died - b.born),
      initialValue);

    return Number((sumAgeMen / arrMen.length).toFixed(2));
  };

  return century ? calcCenturyAge() : calcAge();
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
  const arrWomen = people.filter(person => person.sex === 'f');

  const calcAgeWomenWithChildren = function() {
    const mother = people.map(woman => woman.mother);
    const arrWomenWithChidren = arrWomen.filter(woman =>
      mother.includes(woman.name));

    const initialValue = 0;
    const sumAgeWomen = arrWomenWithChidren.reduce((a, b) =>
      a + (b.died - b.born), initialValue);

    return Number((sumAgeWomen / arrWomenWithChidren.length).toFixed(2));
  };

  const calcAgeWomen = function() {
    const initialValue = 0;
    const sumAgeWomen = arrWomen.reduce((a, b) => a + (b.died - b.born),
      initialValue);

    return Number((sumAgeWomen / arrWomen.length).toFixed(2));
  };

  return withChildren ? calcAgeWomenWithChildren() : calcAgeWomen();
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
  const children = people.filter(child => onlyWithSon
    ? people.find(person => child.mother === person.name && child.sex === 'm')
    : people.find(person => child.mother === person.name));

  const differenceAges = children
    .map(child =>
      (child.born - people.find(mother => mother.name === child.mother).born))
    .reduce((sum, age) => sum + age, 0);

  return Number((differenceAges / children.length).toFixed(2));
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
