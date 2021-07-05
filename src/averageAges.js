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

  let onlyMen;

  arguments.length === 1
    ? onlyMen = people.filter(person => person.sex === 'm')
    : onlyMen = people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  const avarageAge = onlyMen.map(man => man.died - man.born)
    .reduce((a, b) => a + b) / onlyMen.length;

  return avarageAge;
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
  // let onlyWomen = people.filter(person => person.sex === 'f');

  // if (arguments.length === 2) {
  //   onlyWomen = onlyWomen.filter(woman =>
  //     people.some(child => child.mother === woman.name));
  // }
  let onlyWomen;

  arguments.length === 1
    ? onlyWomen = people.filter(person => person.sex === 'f')
    : onlyWomen = people.filter(person => person.sex === 'f'
    && people.some(child => child.mother === person.name));

  const avarageAge = onlyWomen.map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b) / onlyWomen.length;

  return avarageAge;
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
  // write code here
  const mothersAndChilds = people.map(child => {
    const foundMother = people.find(mother => {
      return arguments.length === 2
        ? mother.name === child.mother && child.sex === 'm'
        : mother.name === child.mother;
    });

    return foundMother && child.born - foundMother.born;
  });

  const filteredList = mothersAndChilds.filter(motherAndChild =>
    motherAndChild);

  const avarageDifference = filteredList.reduce((a, b) =>
    a + b) / filteredList.length;

  return avarageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
