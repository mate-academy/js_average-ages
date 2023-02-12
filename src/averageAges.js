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
  const menByCentury = people
    .filter(el => el.sex === 'm' && Math.ceil(el.died / 100) === century);

  const men = people
    .filter(el => el.sex === 'm');

  const calcAverage = function(someArray) {
    const BornYear = someArray.reduce((born, obj) => born + obj.born, 0);
    const DiedYear = someArray.reduce((died, obj) => died + obj.died, 0);

    return ((DiedYear - BornYear) / someArray.length);
  };

  return (century ? calcAverage(menByCentury) : calcAverage(men));

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(el => el.sex === 'f');

  const findMom = function(momName, array) {
    return array.some(el => el.mother === momName);
  };

  const beingMother = people.filter(el => findMom(el.name, people));

  const calcAverage = function(someArray) {
    const BornYear = someArray.reduce((born, obj) => born + obj.born, 0);
    const DiedYear = someArray.reduce((died, obj) => died + obj.died, 0);

    return ((DiedYear - BornYear) / someArray.length);
  };

  return (withChildren ? calcAverage(beingMother) : calcAverage(women));
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
  const findRelative = function(momName, array) {
    return array.find(el => el.name === momName);
  };

  const findRelatives = people.reduce((acc, el) => {
    const mother = findRelative(el.mother, people);

    if (mother) {
      return [...acc, {
        ...el, motherBirth: mother.born,
      }];
    }

    return acc;
  }, []);

  const findRelativesSon = findRelatives.filter(el => el.sex === 'm');

  const calcAverage = function(array) {
    const children = array.reduce((born, obj) => born + obj.born, 0);
    const moms = array.reduce((born, obj) => born + obj.motherBirth, 0);

    const result = (children - moms) / array.length;

    return result;
  };

  return (onlyWithSon
    ? calcAverage(findRelativesSon) : calcAverage(findRelatives));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
