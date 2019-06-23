'use strict';

const getCentury = (year) => Math.ceil(year.died / 100);
const getAge = (person) => person.died - person.born;
const agesSet = (targetArray) => targetArray.map(person => getAge(person));
const getAverageNumber = (targetArray) => Number((targetArray.reduce((a, b) => a + b) / targetArray.length).toFixed(2));

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
  const targetPeople = (century === undefined)
                    ? people.filter(person => person.sex === 'm')
                    : people.filter(person => getCentury(person) === century && person.sex === 'm');

  const ages = agesSet(targetPeople);

  const average = getAverageNumber(ages);
  return average;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const targetPeople = withChildren === undefined
                    ? people.filter(person => person.sex === 'f')
                    : people.filter((person) => people.some(child => person.name === child.mother));

  const ages = agesSet(targetPeople);

  const average = getAverageNumber(ages);
  return average;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const children = onlyWithSon === undefined
                  ? people.filter((child) => people.some(person => person.name === child.mother))
                  : people.filter((child) => people.some(person => person.name === child.mother) && child.sex === 'm');

  const agesDiff = children.map((child) =>
    child.born - (people.find(woman => woman.name === child.mother)).born
  );

  const average = getAverageNumber(agesDiff);
  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff
};
