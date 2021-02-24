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
  const filteredMen = (century === undefined)
    ? people.filter(firstCallback)
    : people.filter(secondCallback);

  return filteredMen.reduce((accumulator, person) =>
    accumulator + (person.died - person.born), 0) / filteredMen.length;

  function firstCallback(human) {
    return human.sex === 'm';
  }

  function secondCallback(human) {
    return human.sex === 'm' && Math.ceil(human.died / 100) === century;
  }
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
  const filteredWomen = people.filter(person => person.sex === 'f');
  const femaleWithChildren = filteredWomen.filter(person =>
    people.some(child => child.mother === person.name)
  );

  return (withChildren === undefined)
    ? filteredWomen.reduce(firstCallback, 0)
    : femaleWithChildren.reduce(secondCallback, 0);

  function firstCallback(accumulator, person) {
    return accumulator + (person.died - person.born) / filteredWomen.length;
  }

  function secondCallback(accumulator, person) {
    return accumulator + (person.died - person.born)
      / femaleWithChildren.length;
  }
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
  const childrenAll = people.filter(firstCallback);
  const childrenBoys = childrenAll.filter(secondCallback);
  const children = (onlyWithSon) ? childrenBoys : childrenAll;

  return children.reduce(thirdCallback, 0);

  function firstCallback(human) {
    return people.find(mother => mother.name === human.mother);
  }

  function secondCallback(human) {
    return human.sex === 'm';
  }

  function thirdCallback(accumulator, person) {
    return accumulator + (person.born - people.find(mother =>
      mother.name === person.mother).born) / children.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
