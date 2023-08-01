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

function calculateMenAverageAge(people, century) {
  const men = people.filter((person) => {
    return century
      ? isMan(person) && century === Math.ceil(person.died / 100)
      : isMan(person);
  });

  const sumOfAges = men.reduce((sum, person) =>
    sum + age(person), 0);
  const avarageAge = sumOfAges / men.length;

  return avarageAge;
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
  const women = people.filter((person) => {
    const hasChildren = people.find(kid => kid.mother === person.name);

    return withChildren
      ? isWoman(person) && hasChildren
      : isWoman(person);
  });

  const sumOfAges = women.reduce((sum, person) => {
    return sum + age(person);
  }, 0);

  const avarageAge = sumOfAges / women.length;

  return avarageAge;
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

  const averageAges = difference / mothers.length;

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
