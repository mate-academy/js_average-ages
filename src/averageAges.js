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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let newArray = [];

  if (century !== undefined) {
    newArray = [...people].filter(
      (person) =>
        person.sex === 'm' && Math.ceil(person.died / 100) === century);
  } else {
    newArray = [...people].filter(
      (person) => person.sex === 'm');
  };

  const averageAgeArray = newArray.map((person) => person.died - person.born);
  const averageAge = averageAgeArray.reduce(
    (acamulator, currentValue) => acamulator + currentValue);

  return averageAge / averageAgeArray.length;
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
  // write code here
  let newArray = [];
  let motherArrey = [];

  newArray = [...people].filter(
    (person) => person.sex === 'f');

  if (withChildren !== undefined) {
    newArray = [...people];
    motherArrey = newArray.map(person => person.mother);
    newArray = newArray.filter(person => motherArrey.includes(person.name));
  };

  const averageAgeArray = newArray.map((person) => person.died - person.born);
  const averageAge = averageAgeArray.reduce(
    (acamulator, currentValue) => acamulator + currentValue);

  return averageAge / averageAgeArray.length;
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
  let motherNameArray = [];
  let averageAgeChildArray = [];
  let motherArray = [];
  let averageAgeDiffArray = [];

  motherNameArray = [...people].map(person => person.mother);

  motherArray = motherNameArray.map(
    name => [...people].find(mother => mother.name === name));
  motherArray = motherArray.filter(mother => mother !== undefined);
  motherNameArray = motherArray.map(person => person.name);
  motherNameArray = motherNameArray.filter(name => name !== null);

  if (onlyWithSon) {
    averageAgeChildArray = [...people].filter(
      person => motherNameArray.includes(person.mother) && person.sex === 'm');
  } else {
    averageAgeChildArray = [...people].filter(
      person => motherNameArray.includes(person.mother));
  }

  averageAgeChildArray = averageAgeChildArray.filter(
    mother => mother !== undefined);

  averageAgeChildArray = averageAgeChildArray.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });

  averageAgeDiffArray = averageAgeChildArray.map(
    child => child.born - [...people].find(
      mother => mother.name === child.mother).born);

  const averageAge = averageAgeDiffArray.reduce(
    (acamulator, currentValue) => acamulator + currentValue);

  return averageAge / averageAgeDiffArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
