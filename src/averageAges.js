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
  const manArr = people.filter(person => person.sex === 'm');

  const yearsArr = (
    century ? getYearsArr(manArr
      .filter(person => Math.ceil(person.died / 100) === century))
      : getYearsArr(manArr)
  );

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
  const womanArr = people.filter(person => person.sex === 'f');
  const mothersArr = people.map(person => person.mother);

  const yearsArr = (
    withChildren ? getYearsArr(people
      .filter(person => mothersArr.includes(person.name)))
      : getYearsArr(womanArr)
  );

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
  const manArr = people.filter(person => (
    onlyWithSon
      ? person.sex === 'm'
      : true));

  let ageDiffArr = manArr.map(({ born, mother }) => {
    const motherArr = people.filter(el => el.name === mother);
    const motherOfPerson = motherArr[0];

    return motherOfPerson && (born - motherOfPerson.born);
  });

  ageDiffArr = ageDiffArr.filter(el => el && el);

  return +(ageDiffArr.reduce((a, b) => a + b, 0) / ageDiffArr.length)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
