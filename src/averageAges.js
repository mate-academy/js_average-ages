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

  const onlyMan = people
    .filter(person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  return calculateAverageAge(onlyMan);
  // console.log(averageAge);
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
  const onlyWoman = people.filter(person => withChildren
    ? people.some(child => child.mother === person.name)
    : person.sex === 'f');

  return calculateAverageAge(onlyWoman);
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

  const childs = people.filter(person => onlyWithSon
    ? people.some(mother => mother.name === person.mother) && person.sex === 'm'
    : people.some(mother => mother.name === person.mother));

  const agesDiff = childs.map(child => {
    const motherIndex = people
      .findIndex(person => person.name === child.mother);

    return child.born - people[motherIndex].born;
  });

  return Math.round((agesDiff.reduce((a, b) => a + b)
    / agesDiff.length) * 100) / 100;
}

//  below function used in first and second task

function calculateAverageAge(groupOfPeople) {
  const sumOfPeopleAge = groupOfPeople.map(person => person.died - person.born)
    .reduce((a, b) => a + b);

  return Math.round((sumOfPeopleAge / groupOfPeople.length) * 100) / 100;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
