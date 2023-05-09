'use strict';

// const people = require("./people");

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
  const isMan = (person) => person.sex === 'm';
  const isManDieInCentury = (person) =>
    person.sex === 'm' && Math.ceil(person.died / 100) === century;
  const mansArr = people.filter(isMan);
  const mansArrDieInCentury = people.filter(isManDieInCentury);

  const sumOfAgeInCentury = mansArrDieInCentury.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );
  const averageAgeInCentury = sumOfAgeInCentury / mansArrDieInCentury.length;

  const sumOfAge = mansArr.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );
  const averageAge = sumOfAge / mansArr.length;

  return century ? averageAgeInCentury : averageAge;

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
  // write code here
  const isWoman = people.filter((person) => person.sex === 'f');
  const isWomanWithChildren = isWoman.filter((woman) =>
    people.find((person) => person.mother === woman.name)
  );

  const sumAgeAllWoman = isWoman.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );
  const averageAgeAllWoman = sumAgeAllWoman / isWoman.length;

  const sumAgeWomanWithChildren = isWomanWithChildren.reduce(
    (sum, person) => sum + (person.died - person.born),
    0
  );
  const averageAgeWomanWithChildren
  = sumAgeWomanWithChildren / isWomanWithChildren.length;

  return withChildren ? averageAgeWomanWithChildren : averageAgeAllWoman;
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
  // write code here
  const children
  = people.filter(child => onlyWithSon ? child.sex === 'm'
  && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  const averageDiff = children.reduce((sum, child) => {
    const mother = people.find(mom => mom.name === child.mother);

    return sum + child.born - mother.born;
  }, 0);

  return averageDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
