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
  const arrOfMen = (century !== undefined) ? people.filter((obj) => {
    return obj.sex === 'm' && Math.ceil(obj.died / 100) === century;
  }) : people.filter((obj) => {
    return obj.sex === 'm';
  });

  const arrOfAges = arrOfMen.map((man) => {
    return man.died - man.born;
  });

  const sum = arrOfAges.reduce((accum, value) => {
    return accum + value;
  });

  return sum / arrOfAges.length;
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
  const arrOfWomen = (withChildren) ? people.filter((obj) => {
    return obj.sex === 'f' && people.some((person) => {
      return person.mother === obj.name;
    });
  }) : people.filter((obj) => {
    return obj.sex === 'f';
  });

  const arrOfAges = arrOfWomen.map((man) => {
    return man.died - man.born;
  });

  const sum = arrOfAges.reduce((accum, value) => {
    return accum + value;
  });

  return sum / arrOfAges.length;
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
  const arrOfPeople = (onlyWithSon) ? people.filter((obj) => {
    return obj.sex === 'm' && obj.mother !== null;
  }) : people.filter((obj) => {
    return obj.mother !== null;
  });

  const filteredArrOfPeople = arrOfPeople.filter((person) => {
    const mother = people.find((element) => {
      return element.name === person.mother;
    });

    return mother !== undefined;
  });

  const arrOfDiff = filteredArrOfPeople.map((person) => {
    const mother = people.find((element) => {
      return element.name === person.mother;
    });

    return person.born - mother.born;
  });

  const sum = arrOfDiff.reduce((accum, value) => {
    return accum + value;
  });

  return sum / arrOfDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
