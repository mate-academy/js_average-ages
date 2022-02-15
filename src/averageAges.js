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
const getAverage = (arr) => {
  return Math.round((arr.reduce((a, b) => a + b) / arr.length) * 100) / 100;
};

const arrOfAges = (arr) => arr.map(person => person.died - person.born);

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menByCentury = men.filter(p => Math.ceil(p.died / 100) === century);

  return century
    ? getAverage(arrOfAges(menByCentury))
    : getAverage(arrOfAges(men));
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

const women = (main) => main.filter(person => person.sex === 'f');

function calculateWomenAverageAge(people, withChildren) {
  const womenWitChildren = women(people)
    .filter(w => people.some(p => p.mother === w.name));

  return withChildren
    ? getAverage(arrOfAges(womenWitChildren))
    : getAverage(arrOfAges(women(people)));
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

function getMothers(arr, person, sex) {
  return sex
    ? arr.find(p => person.sex === 'm' && person.mother === p.name)
    : arr.find(p => person.mother === p.name);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const motherAndChildren = people.map(person => {
    const mothers = getMothers(people, person, onlyWithSon);

    return [person, mothers];
  });

  const arrOfMothersAge = motherAndChildren
    .filter(x => x[1]).map(f => f[0].born - f[1].born);

  return getAverage(arrOfMothersAge);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
