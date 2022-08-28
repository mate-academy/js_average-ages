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

// function returns the average age

function averageFunction(arr) {
  const summary = arr.reduce((sum, person) =>
    sum + person.died - person.born, 0);
  const average = summary / arr.length;

  return average;
}

function calculateMenAverageAge(people, century) {
  // create the array of men

  const men = people.filter(person => person.sex === 'm');

  // array of the men died in specified century

  const menCentury = men.filter(person =>
    Math.ceil(person.died / 100) === century);

  // return average from certain array men

  return (!century) ? averageFunction(men) : averageFunction(menCentury);
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
  // create the array of a women

  const women = people.filter(person => person.sex === 'f');

  // function returns true if qurrent name match some persons mother name

  const findMother = (arr, womenNames) =>
    arr.some(item => item.mother === womenNames);

  // array of mothers

  const mothers = women.filter(person =>
    findMother(people, person.name));

  // return average age from certain womens array

  return (!withChildren) ? averageFunction(women) : averageFunction(mothers);
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
  // get array of mothers

  const women = people.filter(person => person.sex === 'f');
  const findMother = (arr, womenNames) =>
    arr.some(item => item.mother === womenNames);
  const mothers = women.filter(person =>
    findMother(people, person.name));

  // get array of men

  const men = people.filter(item => item.sex === 'm');

  // function that returns difference of ages when finds a child

  const getDifference = (motherName, burthDate) => {
    const mother = mothers.find(mom => mom.name === motherName);

    return (!mother) ? 0 : burthDate - mother.born;
  };

  // get array of age difference boys or any sex person

  const peopleArr = (!onlyWithSon) ? people : men;
  const differenceArray = peopleArr.map(person =>
    getDifference(person.mother, person.born));

  // delete item if mother has not been found

  const differenceArrayFilter = differenceArray.filter(item => item > 0);

  // get average age difference

  const sumDifs = differenceArrayFilter.reduce((accumulator, item) =>
    accumulator + item);
  const average = sumDifs / differenceArrayFilter.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
