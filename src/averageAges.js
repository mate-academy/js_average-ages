'use strict';

/*
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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const getMen = (century === undefined)
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
      && century === Math.ceil(person.died / 100));
  const getMenAge = getMen.map(person => person.died - person.born);
  let getMenAverageAge = getMenAge.reduce((sum, x) => sum + x, 0);

  getMenAverageAge = getMenAverageAge / getMenAge.length;

  return Number(getMenAverageAge.toFixed(2));
}

/*
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If withChildren is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const getWoman = (withChildren === true)
    ? people.filter(person => person.sex === 'f'
      && people.find(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const getWomanAge = getWoman.map(person => person.died - person.born);
  let getWomanAverageAge = getWomanAge.reduce((sum, x) => sum + x, 0);

  getWomanAverageAge = getWomanAverageAge / getWomanAge.length;

  return Number(getWomanAverageAge.toFixed(2));
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If onlyWithSon is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here

  const children = people.filter(person => {
    if (onlyWithSon) {
      return people.some(mother => mother.name === person.mother)
      && person.sex === 'm';
    }

    return people.some(mother => mother.name === person.mother);
  });

  const diff = children
    .map(kid => kid.born - people
      .find(mother => mother.name === kid.mother).born);

  return diff.reduce((sum, x) => sum + x) / diff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
