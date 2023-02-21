'use strict';

const getByKeyValue = (key, value) => people => {
  const peopleCopy = [ ...people ];

  return peopleCopy.filter(person => person[key] === value);
};

const getMen = getByKeyValue('sex', 'm');
const getWomen = getByKeyValue('sex', 'f');

const getValuesArr = (key) => people => {
  const resultArr = [];

  people.filter(person => person[key] !== null
    ? resultArr.push(person[key]) : null);

  return resultArr;
};

const getMotherNames = getValuesArr('mother');

const getMothers = (people, group = people) => {
  const women = getWomen(people);
  const motherNames = getMotherNames(group);
  const mothers = women.filter(woman => motherNames.includes(woman['name']));

  return mothers;
};

const getCentury = died => Math.ceil(died / 100);

const getAges = people => people.map(person => person['died'] - person['born']);

const getAverage = ages => +(
  ((ages.reduce((acc, cur) => acc + cur, 0)) / ages.length
  ).toFixed(2)
) || 0;

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

function calculateMenAverageAge(people, century = 21) {
  const men = getMen(people);
  const menDiedInCentury = men
    .filter(man => getCentury(man['died']) === century);

  const menAges = getAges(menDiedInCentury).length !== 0
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
  const children = onlyWithSon ? getMen(people) : [...people];
  const mothers = getMothers(people, children);

  const ageDiffs = children.map(child => {
    const motherName = child['mother'];
    const mother = mothers.filter(mom => mom['name'] === motherName);

    const ageDiff = mother.length !== 0
      ? child['born'] - mother[0]['born'] : null;

    return ageDiff;
  });

  const filteredDiffs = ageDiffs.filter(age => age);

  return getAverage(filteredDiffs);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
