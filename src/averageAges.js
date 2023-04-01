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

function sumAgeDifference(sum, n) {
  return (sum + n.died - n.born);
}

function calculateMenAverageAge(people, century) {
  let finalPeopleArrayObjects = [];

  function isPersonFromCentury(arr) {
    return (Math.ceil(arr.died / 100) === century);
  };

  finalPeopleArrayObjects
    = (century) ? people.filter(isPersonFromCentury) : people;

  finalPeopleArrayObjects
    = finalPeopleArrayObjects.filter((arr) => (arr.sex === 'm'));

  return Number((finalPeopleArrayObjects.reduce(sumAgeDifference, 0)
   / finalPeopleArrayObjects.length).toFixed(2));
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
let mother = '';

function isMotherWithName(arr) {
  return (arr.name === mother);
};

function calculateWomenAverageAge(people, withChildren) {
  let finalPeopleArrayObjects = [];

  if (withChildren) {
    finalPeopleArrayObjects = people.filter(person =>
      people.find(children => children.mother === person.name));
  } else {
    finalPeopleArrayObjects = people.filter((arr) => (arr.sex === 'f'));
  }

  return Number((finalPeopleArrayObjects.reduce(sumAgeDifference, 0)
     / finalPeopleArrayObjects.length).toFixed(2));
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
  const finalPeopleArrayObjects = [];
  let bornChildren = 0;
  let temporaryPeople = {};

  for (const title of people) {
    mother = title.mother;
    bornChildren = title.born;

    if (people.find(isMotherWithName) && (title.sex === 'm')
      && (onlyWithSon)) {
      temporaryPeople = people.find(isMotherWithName);
      temporaryPeople.bornChildren = bornChildren;
      finalPeopleArrayObjects.push({ ...temporaryPeople });
    } else {
      if (people.find(isMotherWithName) && (!onlyWithSon)) {
        temporaryPeople = people.find(isMotherWithName);
        temporaryPeople.bornChildren = bornChildren;
        finalPeopleArrayObjects.push({ ...temporaryPeople });
      }
    }
  }

  function sumAgeDifferenceWithChildren(summa, n) {
    return (summa + n.bornChildren - n.born);
  }

  return Number((finalPeopleArrayObjects.reduce(sumAgeDifferenceWithChildren, 0)
   / finalPeopleArrayObjects.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
