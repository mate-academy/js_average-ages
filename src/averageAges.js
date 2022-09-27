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

function calculateAveragePeopleAge(people) {
  const ages = people.map(person => person.died - person.born);

  const sumOfAge = ages.reduce((x, y) => x + y, 0);

  return sumOfAge / ages.length;
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  const listOfMen = people.filter(human => human.sex === 'm');

  const menYears = century
    ? listOfMen.filter(person => Math.ceil(person.died / 100) === century)
    : listOfMen;

  return calculateAveragePeopleAge(menYears);
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
function hasChild(people, mother) {
  const children = people.filter(child => child.mother === mother.name);

  return children.length !== 0;
}

function calculateWomenAverageAge(people, withChildren) {
  const listOfWomen = people.filter(human => human.sex === 'f');

  const womenYear = withChildren
    ? listOfWomen.filter(woman => hasChild(people, woman))
    : listOfWomen;

  return calculateAveragePeopleAge(womenYear);
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
  const women = people.filter(human => human.sex === 'f');
  const ages = [];

  women.forEach(woman => {
    const children = findChildren(people, woman, onlyWithSon);

    children.forEach(child => {
      ages[ages.length] = child.born - woman.born;
    });
  });

  return ages.reduce((x, y) => (
    x + y
  ), 0) / ages.length;
}

function findChildren(people, mother, onlyWithSon) {
  return people.filter(child => {
    return onlyWithSon
      ? child.mother === mother.name && child.sex === 'm'
      : child.mother === mother.name;
  });
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
