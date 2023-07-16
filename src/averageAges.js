'use strict';

/*
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
  const onlyMens = century !== undefined ? people.filter(
    person => person.sex === 'm' && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const mensYears = onlyMens.map(person => person.died - person.born);
  const mensYearSummary = mensYears.reduce((sum, age) => sum + age, 0);
  const averageAges = mensYearSummary / mensYears.length;

  return Math.round(averageAges * 100) / 100;
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
function calculateWomenAverageAge(people, withChildren = false) {
  const womenArray = withChildren
    ? people.filter(
      person => people.some(human => human.mother === person.name)
    )
    : people.filter(person => person.sex === 'f');

  const womenAges = womenArray.map(women => women.died - women.born);
  const womensYearSummary = womenAges.reduce((sum, age) => sum + age, 0);
  const averageAges = womensYearSummary / womenAges.length;

  return Math.round(averageAges * 100) / 100;
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
  const notOrphan = people.filter(person => person.mother !== null);
  const sortedPeople = onlyWithSon
    ? notOrphan.filter(person => person.sex === 'm')
    : notOrphan;

  const ageDifference = sortedPeople.map(man => {
    const mother = people.find(person => person.name === man.mother);

    return mother !== undefined ? man.born - mother.born : null;
  });

  const correctAgeDifference = ageDifference.filter(
    element => element !== null
  );

  const summaryAge = correctAgeDifference.reduce((sum, age) => sum + age, 0);
  const averageAges = summaryAge / correctAgeDifference.length;

  return Math.round(averageAges * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
