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
  let sumOfAges = 0;

  const men = century
    ? people.filter(person => Math.ceil(person.died / 100)
    === century && person.sex === 'm')

    : people.filter(person => person.sex === 'm');

  sumOfAges = men.reduce((sum, manData) => (dataReduce(manData) + sum), 0);

  const amountOfPeople = men.length;
  const res = sumOfAges / amountOfPeople;

  return res;
}

function dataReduce(person) {
  return person.died - person.born;
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
  let sumOfAges = 0;

  const women = withChildren
    ? people.filter((person) => {
      const peopleHaveMother = people.map(persone => persone.mother);

      return peopleHaveMother.includes(person.name);
    }) : people.filter(x => x.sex === 'f');

  sumOfAges = women.reduce((sum, woman) =>
    (dataReduce(woman) + sum), 0);

  const amountOfWomen = women.length;

  const res = sumOfAges / amountOfWomen;

  return res;
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
  const mothersArr = people.map(person => person.mother);
  const mothers = people.filter(person => mothersArr.includes(person.name));
  const men = people.filter(person => person.sex === 'm');
  let countOfpeople = 0;
  let result = 0;

  const children = onlyWithSon
    ? men.filter(y => y.mother).filter(person => person !== null)

    : people.filter(person =>
      person.mother).filter(person => person !== null);

  const amountOfDifferAges = children.reduce((previousValue, child) => {
    const mother = mothers.find((mom) => {
      if (mom.name === child.mother) {
        return mom;
      }
    });

    let sum = previousValue;

    if (mother) {
      sum += child.born - mother.born;
      countOfpeople++;
    }

    return sum;
  }, 0);

  result = amountOfDifferAges / countOfpeople;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
