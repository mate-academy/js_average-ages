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
  let men = people.filter(person => person.sex === 'm');

  men = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
    : men;

  const totalAge = men.reduce((accumulator, man) => {
    return accumulator + (man.died - man.born);
  }, 0);

  return totalAge / men.length;
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
  let women = people.filter(woman => woman.sex === 'f');

  women = withChildren
    ? women = women.filter(woman => people
      .some(person => person.mother === woman.name))
    : women;

  const totalAge = women.reduce((accumulator, woman) => {
    return accumulator + (woman.died - woman.born);
  }, 0);

  return totalAge / women.length;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : people;

  const ageOdds = filteredPeople.map(human => {
    const mother = people.find(person => person.name === human.mother);

    return mother && human.born - mother.born;
  }).filter(person => person);

  const totalAgeOdds = ageOdds.reduce((accumulator, currentDiference) => {
    return accumulator + currentDiference;
  }, 0);

  return totalAgeOdds / ageOdds.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
