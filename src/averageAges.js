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

const calculateAverageAge = (people) => {
  return (
    people.reduce((prev, person) => person.died - person.born + prev, 0)
    / people.length
  );
};

const filterPeopleByGender = (people, gender) => {
  return people.filter((person) => person.sex === gender);
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let onlyMalePeople = filterPeopleByGender(people, 'm');

  if (century) {
    onlyMalePeople = onlyMalePeople.filter(
      (person) => Math.ceil(person.died / 100) === century
    );
  }

  return calculateAverageAge(onlyMalePeople);
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
  let onlyFemalePeople;

  withChildren
    ? (onlyFemalePeople = filterPeopleByGender(people, 'f').filter((woman) =>
      people.some((person) => person.mother === woman.name)
    ))
    : (onlyFemalePeople = filterPeopleByGender(people, 'f'));

  return calculateAverageAge(onlyFemalePeople);
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
  let children;

  onlyWithSon
    ? (children = people.filter((child) =>
      people.find(
        (person) => child.mother === person.name && child.sex === 'm'
      )
    ))
    : (children = people.filter((child) =>
      people.find((person) => child.mother === person.name)
    ));

  const childMotherAgeDiff = children.map(
    (child) =>
      child.born - people.find((person) => child.mother === person.name).born
  );

  return (
    childMotherAgeDiff.reduce((prev, age) => age + prev, 0)
    / childMotherAgeDiff.length
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
