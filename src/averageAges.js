'use strict';

const getByKeyValue = (key, value) => people => {
  return people.filter(person => person[key] === value);
};

const getMen = getByKeyValue('sex', 'm');
const getWomen = getByKeyValue('sex', 'f');

const getMothers = (people) => {
  const women = getWomen(people);

  return women.filter(woman => people.some(person => person.mother === woman.name));
};

const getCentury = died => Math.ceil(died / 100);
const getAges = people => people.map(person => person['died'] - person['born']);

const getAverage = ages =>
  ages.reduce((acc, cur) => acc + cur, 0) / ages.length;

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
  const men = getMen(people);
  const menDiedInCentury = men
    .filter(man => getCentury(man['died']) === century);
  const menAges = century
    ? getAges(menDiedInCentury) : getAges(men);

  return getAverage(menAges);
};

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
  const women = !withChildren ? getWomen(people) : getMothers(people);
  const womenAges = getAges(women);

  return getAverage(womenAges);
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

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const children = onlyWithSon ? getMen(people) : people;
  const mothers = getMothers(people);
  const ageDiffs = children.map(({ mother: motherName, born: childBorn }) => {
    const mother = mothers.filter(({ name }) => name === motherName);

    return mother.length !== 0 ? childBorn - mother[0]['born'] : null;
  });
  const filteredDiffs = ageDiffs.filter(age => age);

  return getAverage(filteredDiffs);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
