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

  const filteredMen = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const mensAge = filteredMen.map(person => person.died - person.born);
  const totalAge = mensAge.reduce((age, current) => age + current, 0);

  return totalAge / mensAge.length;
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
  const filteredWomen = people.filter(person => withChildren
    ? isMother(person)
    : person.sex === 'f');

  function isMother(person) {
    const motherName = person.name;
    const found = people.findIndex(
      foundperson => foundperson.mother === motherName);

    return (found !== -1);
  };

  const womenAge = filteredWomen.map(person => person.died - person.born);
  const totalAge = womenAge.reduce((age, current) => age + current, 0);

  return totalAge / womenAge.length;
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
  const childMotherAgeDiffArray = [];
  let foundMother;

  onlyWithSon
    ? people.filter(person => person.sex === 'm').forEach(checkMotherInArray)
    : people.forEach(checkMotherInArray);

  function checkMotherInArray(person) {
    const personMother = person.mother;

    foundMother = people.find(mother => mother.name === personMother);

    if (foundMother) {
      childMotherAgeDiffArray.push(person.born - foundMother.born);
    };
  }

  const averageAge = childMotherAgeDiffArray.reduce(
    (sum, curr) => sum + curr, 0);

  return averageAge / childMotherAgeDiffArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
