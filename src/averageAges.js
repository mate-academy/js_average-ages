'use strict';

const isMan = (person) => person.sex === 'm';
const calculateAge = (person) => person.died - person.born;
const calculateAvgAge = (dates) => dates.reduce((date1, date2) =>
  date1 + date2) / dates.length;
const isMother = (child, mother) => child.mother === mother.name;

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
  const men = people.filter(person => isMan(person));
  const menAges = century
    ? men
      .filter(person => Math.ceil(person.died / 100) === century)
      .map(person => calculateAge(person))
    : men.map(person => (calculateAge(person)));

  const averageAges = calculateAvgAge(menAges);

  return averageAges;
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
  const filteredWomen = withChildren
    ? people.filter(person => people.find(child => isMother(child, person)))
    : people.filter(person => person.sex === 'f');

  const womenAges = filteredWomen.map(person => calculateAge(person));
  const averageAges = calculateAvgAge(womenAges);

  return averageAges;
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
  const mothers = onlyWithSon
    ? people.filter(person => people.find(child => isMother(child, person)
    && isMan(child)))
    : people.filter(person => people.find(child => isMother(child, person)));

  const children = onlyWithSon
    ? people.filter(person => people.find(mother => isMother(person, mother)
    && isMan(person)))
    : people.filter(person =>
      people.find(mother => isMother(person, mother)));

  const ageDifferences = children.map(child =>
    child.born - mothers.find(mother => isMother(child, mother)).born);
  const averageAges = calculateAvgAge(ageDifferences);

  return averageAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
