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

  const man = people.filter((person) => person.sex === 'm');
  const agesOfMan = man.map((person) => person.died - person.born);
  const ageSum = agesOfMan.reduce((sum, age) => sum + age, 0);

  const callback = function(person) {
    return person.sex === 'm'
    && Math.ceil(person.died / 100) === century;
  };
  const menInCentury = people.filter(callback);
  const agesManInCentury = menInCentury.map((person) => person.died
    - person.born);
  const ageSumManInCentury = agesManInCentury.reduce((sum, age) => sum
    + age, 0);
  const result = (century === undefined)
    ? (ageSum / agesOfMan.length)
    : (ageSumManInCentury / agesManInCentury.length);

  return result;
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
  const allWomen = people.filter((person) => person.sex === 'f');
  const agesOfAllWomen = allWomen.map((person) => person.died - person.born);
  const sumOfAllAgesWomen = agesOfAllWomen.reduce((sum, age) => sum + age, 0);

  function callback(person) {
    const children = people.some((child) => person.name === child.mother);

    return person.sex === 'f' && children === true;
  }

  const womenWithChildren = people.filter(callback);
  const agesOfWomenWithChildren = womenWithChildren.map((person) => person.died
    - person.born);
  const sumOfAgesWithChildren = agesOfWomenWithChildren.reduce((sum, age) => sum
    + age, 0);

  const result = (withChildren === undefined)

    ? sumOfAllAgesWomen / agesOfAllWomen.length
    : sumOfAgesWithChildren / agesOfWomenWithChildren.length;

  return result;
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
  const children = people.filter((child) => child.mother);
  const women = people.filter((woman) => woman.sex === 'f');

  function callback(child) {
    const mother = women.find((woman) => woman.name === child.mother);

    return mother && child.born - mother.born;
  }

  const arrayOfAges = children.map(callback);
  const correctArrayOfAges = arrayOfAges.filter((age) => age);
  const sumOfAge = correctArrayOfAges.reduce((sum, age) => sum + age, 0);

  const sons = people.filter((child) => child.mother && child.sex === 'm');

  function callbackWithSun(child) {
    const motherWithSon = women.find((mother) => mother.name === child.mother);

    return motherWithSon && child.born - motherWithSon.born;
  }

  const arrayOfAgesWishSon = sons.map(callbackWithSun);
  const correctArrayOfAgesWithSon = arrayOfAgesWishSon.filter((age) => age);
  const sumWithSon = correctArrayOfAgesWithSon.reduce((sum, age) => sum
    + age, 0);

  const result = (onlyWithSon === true)
    ? sumWithSon / correctArrayOfAgesWithSon.length
    : sumOfAge / correctArrayOfAges.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
