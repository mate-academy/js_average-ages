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
const isMan = (person) => person.sex === 'm';
const isWoman = (person) => person.sex === 'f';
const age = (person) => person.died - person.born;

function calculateAverageAge(people, condition) {
  const filteredPeople = people.filter(condition);
  const sumOfAges = filteredPeople
    .reduce((sum, person) => sum + age(person), 0);

  return sumOfAges / filteredPeople.length;
}

function calculateMenAverageAge(people, century) {
  const condition = (person) => {
    return century
      ? isMan(person) && century === Math.ceil(person.died / 100)
      : isMan(person);
  };

  return calculateAverageAge(people, condition);
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
  const condition = (person) => {
    const hasChildren = people.find(kid => kid.mother === person.name);

    return withChildren
      ? isWoman(person) && hasChildren
      : isWoman(person);
  };

  return calculateAverageAge(people, condition);
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
  const mothers = people.filter((person) => {
    const mother = people.find((woman) => woman.name === person.mother);

    return onlyWithSon
      ? mother && isMan(person)
      : mother;
  });

  const difference = mothers.reduce((prev, person) =>
    prev + (person.born - people.find((woman) =>
      woman.name === person.mother).born), 0);

  return difference / mothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
