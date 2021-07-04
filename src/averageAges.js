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

  const getMen = function(person) {
    const personCentury = Math.ceil(person.died / 100);
    const result = (century)
      ? personCentury === century && person.sex === 'm'
      : person.sex === 'm';

    return result;
  };

  const men = people.filter(getMen);
  const menAges = men.map((man) => man.died - man.born);
  const sumMenAges = menAges.reduce((sum, age) => sum + age);

  return sumMenAges / menAges.length;
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
  const getWomen = function(person) {
    const result = (withChildren)
      ? people.some(woman => woman.mother === person.name)
      : person.sex === 'f';

    return result;
  };

  const women = people.filter(getWomen);
  const womenAges = women.map((woman) => woman.died - woman.born);
  const sumWomenAges = womenAges.reduce((sum, age) => sum + age);

  return sumWomenAges / womenAges.length;
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
  const getChildren = function(person) {
    const getChildMale = function(child) {
      const childMale = person.sex === 'm' && child.name === person.mother;

      return childMale;
    };

    const result = (onlyWithSon)
      ? people.find(getChildMale)
      : people.find(child => child.name === person.mother);

    return result;
  };

  const children = people.filter(getChildren);
  const getAgesDiff = function(child) {
    const mother = people.find(person => child.mother === person.name);
    const result = child.born - mother.born;

    return result;
  };

  const agesDiff = children.map(getAgesDiff);
  const sumAveragesAgesDiff = agesDiff.reduce((sum, age) => sum + age);

  return sumAveragesAgesDiff / agesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
