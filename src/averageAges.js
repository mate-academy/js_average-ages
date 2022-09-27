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
  let filteredMen = people.filter(person => person.sex === 'm');

  if (arguments.length > 1) {
    const filterByCentury = filteredMen.filter(x => Math
      .ceil(x.died / 100) === century);

    filteredMen = [...filterByCentury];
  }

  let avg = filteredMen.reduce((sum, x) => sum + (x.died - x.born), 0);

  avg = (avg / filteredMen.length);

  return parseFloat(avg.toFixed(2));
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
  let filteredWoman = people.filter(person => person.sex === 'f');
  const mothers = people.map(person => person.mother);

  if (withChildren) {
    const motherWithCH = filteredWoman.filter(x => {
      const motherName = x.name;

      return mothers.includes(motherName);
    });

    filteredWoman = [...motherWithCH];
  }

  let avg = filteredWoman.reduce((sum, x) => sum + (x.died - x.born), 0);

  avg = (avg / filteredWoman.length);

  return parseFloat(avg.toFixed(2));
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
  let children = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  const res = children.reduce((prev, curr) =>
    prev + curr.born - people.find(person =>
      person.name === curr.mother).born, 0) / children.length;

  return res;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
