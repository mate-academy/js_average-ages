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
// function genderDetermination(persons, sex) {
//   return persons.filter(person => person.sex === sex);
// }

function getAvarageAge(arr) {
  function callback(prev, newOne) {
    let sum = prev;

    sum += newOne.died - newOne.born;

    return sum;
  }

  return arr.reduce(callback, 0) / arr.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  // console.log(century)

  const menOnly = people.filter(person => (
    century !== undefined
      ? Math.ceil(person.died / 100) === century && person.sex === 'm'
      : person.sex === 'm'
  ));

  return getAvarageAge(menOnly);
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
  const women = people.filter(person => (
    withChildren === true
      ? people.some(child => child.mother === person.name) && person.sex === 'f'
      : person.sex === 'f'
  ));

  return getAvarageAge(women);
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
  const childrens = people.filter(kids =>
    onlyWithSon === true
      ? people.some(mom => mom.name === kids.mother) && kids.sex === 'm'
      : people.some(mom => mom.name === kids.mother));

  const ageDifference = childrens.map(child => {
    const mother = people.find(mom => mom.name === child.mother);

    return (child.born - mother.born);
  });

  return ageDifference.reduce((accumulator, newValue) =>
    accumulator + newValue, 0) / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
