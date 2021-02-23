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
  const isMan = person => person.sex === 'm';
  const isManInCentury = person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century;

  const onlyMen = century
    ? people.filter(isManInCentury)
    : people.filter(isMan);

  const onlyMenAges = onlyMen.map(getPeopleAges);
  const calculatedMenAges = onlyMenAges.reduce(calculateAges)
    / onlyMenAges.length;

  return calculatedMenAges;
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
  const isWoman = person => person.sex === 'f';
  const isWomanWithChildren = person => person.sex === 'f'
    && people.some(human => human.mother === person.name);

  const onlyWomen = withChildren
    ? people.filter(isWomanWithChildren)
    : people.filter(isWoman);

  const onlyWomenAges = onlyWomen.map(getPeopleAges);
  const calculatedWomenAges = onlyWomenAges.reduce(calculateAges)
    / onlyWomenAges.length;

  return calculatedWomenAges;
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
  const filterPeople = person =>
    people.some(mother => mother.name === person.mother);

  const filterMenOnly = person => person.sex === 'm'
    && people.some(mother => mother.name === person.mother);

  const filteredPeople = onlyWithSon
    ? people.filter(filterMenOnly)
    : people.filter(filterPeople);

  const filteredPeopleAges = filteredPeople.map(
    person => person.born - people.find(
      mother => mother.name === person.mother).born
  );

  const calculatedAges = filteredPeopleAges.reduce(calculateAges)
    / filteredPeopleAges.length;

  return calculatedAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

const getPeopleAges = (person) => {
  return person.died - person.born;
};

const calculateAges = (previousPersonAge, nextPersonAge) => {
  return previousPersonAge + nextPersonAge;
};
