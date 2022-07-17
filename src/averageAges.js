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

  const menOnly = filterBySex(people, 'm');

  const menOnlyCentury = menOnly.filter((person) => (
    Math.ceil(person.died / 100) === century)
  );

  const menOnlyAverageAge = (isFinite(century))
    ? calculateAverageAge(menOnlyCentury)
    : calculateAverageAge(menOnly);

  return menOnlyAverageAge;
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
  const womenOnly = filterBySex(people, 'f');
  const womenOnlyHasChild = filterMothers(people);

  const womenOnlyAverageAge = (withChildren)
    ? calculateAverageAge(womenOnlyHasChild)
    : calculateAverageAge(womenOnly);

  return womenOnlyAverageAge;
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
  const mothers = filterMothers(people);
  const sonsAndDaughters = filterHasMother(people);
  const sonsOnly = filterBySex(sonsAndDaughters, 'm');

  const children = (onlyWithSon)
    ? sonsOnly
    : sonsAndDaughters;

  const ageDiffMomChild = children.map(child =>
    child.born - (mothers.find(woman =>
      woman.name === child.mother)).born);

  return ageDiffMomChild.reduce((acc, age) => acc + age, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

function filterBySex(peopleArray, sex) {
  return peopleArray.filter((person) => person.sex === sex);
}

function calculateAverageAge(peopleArray) {
  return peopleArray.reduce((prev, curr) =>
    prev + (curr.died - curr.born), 0) / peopleArray.length;
}

function filterMothers(peopleArray) {
  const womenOnly = filterBySex(peopleArray, 'f');
  const mothers = peopleArray.map(person => person.mother);

  return womenOnly.filter(person => mothers.includes(person.name));
}

function filterHasMother(peopleArray) {
  return peopleArray.filter(({ mother }) =>
    peopleArray.find(({ name }) => name === mother));
}
