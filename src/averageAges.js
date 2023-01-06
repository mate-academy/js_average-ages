'use strict';

function calculateAverageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

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
  let filteredMen = people.filter(person =>
    person.sex === 'm');

  filteredMen = century
    ? filteredMen.filter(men => Math.ceil(men.died / 100) === century)
    : filteredMen;

  return calculateAverageAge(filteredMen);
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
  let filteredWomen = people.filter(person =>
    person.sex === 'f');

  filteredWomen = withChildren
    ? filteredWomen.filter(woman =>
      people.some((person) => person.mother === woman.name))
    : filteredWomen;

  return calculateAverageAge(filteredWomen);
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
  let filteredKids = people.filter(kid => people.some(person =>
    kid.mother === person.name));

  filteredKids = onlyWithSon
    ? filteredKids.filter(kid => kid.sex === 'm')
    : filteredKids;

  const mothers = filteredKids.map(kid =>
    people.find(mother => mother.name === kid.mother));

  const ageDiff = filteredKids.map((kid, index) =>
    kid.born - mothers[index].born);

  const sumOfDiff = ageDiff.reduce((sum, age) => sum + age, 0);

  return sumOfDiff / filteredKids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
