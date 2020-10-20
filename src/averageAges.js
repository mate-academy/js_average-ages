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

  const arrCorrected = (people.map(person => {
    const collectPerson = [];

    century
      ? (person.sex === 'm')
        && (Math.ceil(person.died / 100) === century)
        && (collectPerson.push(person.died - person.born))
      : (person.sex === 'm')
        && (collectPerson.push(person.died - person.born));

    return +collectPerson;
  }));

  let result = arrCorrected.filter(personAge => personAge > 0);

  result = result.reduce((sum, x) => sum + x, 0) / result.length;

  return result;
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here

  const arrCorrected = (people.map(person => {
    const collectPerson = [];
    const isMother = (persons) => people.some((human) => human.mother
                  === persons.name);

    withChildren
      ? (person.sex === 'f')
        && (isMother(person))
        && (collectPerson.push(person.died - person.born))
      : (person.sex === 'f')
        && (collectPerson.push(person.died - person.born));

    return +collectPerson;
  }));

  let result = arrCorrected.filter(personAge => personAge > 0);

  result = result.reduce((sum, x) => sum + x, 0) / result.length;

  return result;
};

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
  // write code here
  const arrCorrected = [];

  people.some(function(itemMother) {
    onlyWithSon !== undefined
      ? people.some(function(itemSon) {
        itemSon.mother === itemMother.name
      && itemSon.sex === 'm'
      && arrCorrected.push(itemSon.born - itemMother.born);
      })
      : people.some(function(itemChild) {
        itemChild.mother === itemMother.name
      && arrCorrected.push(itemChild.born - itemMother.born);
      });
  });

  let result = arrCorrected.filter(personAge => personAge > 0);

  result = result.reduce((sum, x) => sum + x, 0) / result.length;

  return result;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
