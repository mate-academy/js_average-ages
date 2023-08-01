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
const CENTURY = 100;
const MAN = 'm';
const WOMAN = 'f';

function average(ages) {
  return ages.reduce((sum, value) => sum + value, 0);
}

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const ages = [];
  let averageAge = 0;
  let eteration = 0;
  const isMan = human => human.sex === MAN;

  function CalculatingAverages(human) {
    const age = human.died - human.born;

    ages.push(age);
    eteration++;
  }

  century
    ? people.map((human) => {
      if (isMan(human) && Math.ceil(human.died / CENTURY) === century) {
        CalculatingAverages(human);
      }
    })
    : people.map((human) => {
      if (isMan(human)) {
        CalculatingAverages(human);
      }
    });

  averageAge = average(ages);

  return averageAge / eteration;
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
  const ages = [];
  let averageAge = 0;
  let eteration = 0;
  const mothers = people.map((human) => human.mother);
  const isWoman = human => human.sex === WOMAN;

  function CalculatingAverages(human) {
    const age = human.died - human.born;

    ages.push(age);
    eteration++;
  }

  withChildren
    ? people.map((human) => {
      if (isWoman(human) && mothers.includes(human.name)) {
        CalculatingAverages(human);
      }
    })
    : people.map((human) => {
      if (isWoman(human)) {
        CalculatingAverages(human);
      }
    });

  averageAge = average(ages);

  return averageAge / eteration;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  const childs = people.filter(child =>
    onlyWithSon
      ? people.find(human => human.name === child.mother) && child.sex === MAN
      : people.find(human => human.name === child.mother)
  );

  const difference = childs.map(
    mother => mother.born
    - people.find(human => human.name === mother.mother).born);

  const sumDif = average(difference);

  return sumDif / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
