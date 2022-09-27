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

  const mens = people.filter((human) => human.sex === 'm');
  const centuryGiven = century
    ? mens.filter(men => Math.ceil(men.died / 100) === century)
    : mens;

  const menAges = centuryGiven.map(men => men.died - men.born);
  const menTotalAge = menAges.reduce((a, b) => a + b, 0);

  return menTotalAge / menAges.length;
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
  const womans = people.filter((human) => human.sex === 'f');
  const childGiven = withChildren
    ? womans
      .filter(women => people
        .find(person => person.mother === women.name))
    : womans;

  const womanAges = childGiven.map(woman => woman.died - woman.born);
  const womanTotalAge = womanAges.reduce((a, b) => a + b, 0);

  return Number((womanTotalAge / womanAges.length).toFixed(2));
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
  const ageDiff = onlyWithSon
    ? people.filter(person => (
      people.find(women => person.mother === women.name)
      && person.sex === 'm'))
    : people.filter(person => (
      people.find(women => person.mother === women.name)));

  const ageArr = ageDiff.map(person => {
    const mother = people.find(mom => mom.name === person.mother);
    const diff = person.born - mother.born;

    return diff;
  });

  const agesAverage = ageArr.reduce((a, b) => a + b, 0) / ageArr.length;

  return agesAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
