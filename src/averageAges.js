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
  let allMen;

  century ? allMen = people.filter(person => person.sex === 'm'
    && person.died > ((century - 1) * 100)
    && person.died < ((century) * 100))
    : allMen = people.filter(person => person.sex === 'm');

  const manLifeLength = allMen.map(person => person.died - person.born);
  const callback = (preSum, x) => {
    return preSum + x;
  };

  const sum = [...manLifeLength].reduce(callback);
  const result = sum / manLifeLength.length;

  return result;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let allWoman;

  const peopleWithMotherInfo = people.filter(person => person.mother !== null);

  withChildren
    ? allWoman = people.filter(person => peopleWithMotherInfo.find(child =>
      child.mother === person.name))
    : allWoman = people.filter(person => person.sex === 'f');

  const womanLifeLength = allWoman.map(person => person.died - person.born);
  const callback = (preSum, x) => {
    return preSum + x;
  };

  const sum = [...womanLifeLength].reduce(callback);
  const result = sum / womanLifeLength.length;

  return result;
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
  let withMomInfo;

  onlyWithSon
    ? withMomInfo = people.filter(person => person.mother !== null
      && person.sex === 'm')
    : withMomInfo = people.filter(person => person.mother !== null);

  function ageOfBecomingMom(child) {
    const mom = people.find(mother => mother.name === child.mother);

    return (mom !== undefined) ? child.born - mom.born : 0;
  }

  const giveBirthYear = withMomInfo.map(ageOfBecomingMom).filter(age =>
    age > 0);

  const sumOfDeliverYears = [...giveBirthYear].reduce((sum, age) =>
    sum + age);

  return sumOfDeliverYears / giveBirthYear.length; // 391/13
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
