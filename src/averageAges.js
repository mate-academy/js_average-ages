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
  let mens;
  const mensAges = [];

  (arguments.length < 2)
    ? mens = people.filter(person => person.sex === 'm')
    : mens = people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century);

  mens.map(men => mensAges.push(men.died - men.born));

  return getAverageAge(mensAges);
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
function calculateWomenAverageAge(people, withChildren = false) {
  const womensAges = [];

  const womens = people.filter((person, i, arr) => {
    return (withChildren)
      ? arr.some(arrPerson => person.name === arrPerson.mother)
      : person.sex === 'f';
  });

  womens.map(women => womensAges.push(women.died - women.born));

  return getAverageAge(womensAges);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let peopleWithMom;
  const agesYoungMoms = [];
  const mothers = people.filter((mother, i, arr) =>
    arr.some(arrPerson => mother.name === arrPerson.mother)
  );

  (onlyWithSon)
    ? peopleWithMom = people.filter((person, i, arr) =>
      person.mother && arr.find(arrPerson => arrPerson.name === person.mother)
        && person.sex === 'm')
    : peopleWithMom = people.filter((person, i, arr) =>
      person.mother && arr.find(arrPerson => arrPerson.name === person.mother)
    );

  peopleWithMom.map(person => {
    agesYoungMoms.push(person.born
      - mothers.find(mother => mother.name === person.mother).born);
  });

  return getAverageAge(agesYoungMoms);
}

const getAverageAge = arrAges => {
  const howManyPeople = arrAges.length;
  const sumAges = arrAges.reduce((sum, age) => sum + age, 0);

  return sumAges / howManyPeople;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
