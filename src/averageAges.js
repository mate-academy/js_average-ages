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

function getAverageFromArr(arr) {
  return +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
}

const getYearsArr = (arr) => {
  return arr.map(person => {
    const { died, born } = person;

    return +died - +born;
  });
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const manArr = people.filter(person => person.sex === 'm');

  let yearsArr;

  if (century) {
    const filteredArr = manArr
      .filter(person => Math.ceil(person.died / 100) === century);

    yearsArr = getYearsArr(filteredArr);
  } else {
    yearsArr = getYearsArr(manArr);
  };

  return getAverageFromArr(yearsArr);
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
  const womanArr = people.filter(person => person.sex === 'f');

  let yearsArr;

  if (withChildren) {
    const mothersArr = people.map(person => person.mother);

    const filteredArr = womanArr
      .filter(person => mothersArr.includes(person.name));

    yearsArr = getYearsArr(filteredArr);
  } else {
    yearsArr = getYearsArr(womanArr);
  };

  return getAverageFromArr(yearsArr);
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
  let ageDiffArr;

  if (onlyWithSon) {
    const manArr = people.filter(person => person.sex === 'm');

    ageDiffArr = manArr.map(person => {
      const motherArr = people.filter(el => el.name === person.mother);
      const mother = motherArr[0];

      if (mother) {
        return (person.born - mother.born);
      }
    });
  } else {
    ageDiffArr = people.map(person => {
      const motherArr = people.filter(el => el.name === person.mother);
      const mother = motherArr[0];

      if (mother) {
        return (person.born - mother.born);
      }
    });
  }

  ageDiffArr = ageDiffArr.filter(el => {
    if (el) {
      return el;
    }
  });

  return +(ageDiffArr.reduce((a, b) => a + b, 0) / ageDiffArr.length)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
