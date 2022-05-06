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

const findAge = person => person.died - person.born;
const isMale = person => person.sex === 'm';
const isFemale = person => person.sex === 'f';
const isMother = (child, mother) => child.mother === mother.name;
const calculateAvgAge = (age) => age.reduce((age1, age2) =>
  age1 + age2) / age.length;

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => isMale(man));
  const menAveAges = century
    ? men.filter(man => Math.ceil(man.died / 100) === century)
      .map(person => findAge(person))
    : men.map(person => (
      findAge(person)));

  const menAverageAge = calculateAvgAge(menAveAges);

  return menAverageAge;

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
function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren
    ? people.filter(mother => people.find(child =>
      isMother(child, mother)))
    : people.filter(woman => isFemale(woman));

  const womenAges = women.map(woman => findAge(woman));
  const womenAverageAge = calculateAvgAge(womenAges);

  return womenAverageAge;
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
  const children = onlyWithSon
    ? people.filter(person =>
      people.find(mother => isMother(person, mother)
    && isMale(person)))
    : people.filter(person =>
      people.find(mother => isMother(person, mother)));

  const mothers = onlyWithSon
    ? people.filter(person =>
      people.find(child => isMother(child, person)
      && isMale(child)))
    : people.filter(person =>
      people.find(child => isMother(child, person)));

  const averageAgeDiffrence = children.map(child =>
    child.born - mothers.find(mother =>
      isMother(child, mother)).born);

  const mothersAveAges = calculateAvgAge(averageAgeDiffrence);

  return mothersAveAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
