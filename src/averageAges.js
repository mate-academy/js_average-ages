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
  const menAgeFiltr = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);
  const menAverageAge = menAgeFiltr.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0) / menAgeFiltr.length;

  return menAverageAge;
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
  const hoIsWoman = people.filter(person => person.sex === 'f');

  const womenFiltr = !withChildren
    ? hoIsWoman
    : hoIsWoman.filter(
      mathers => people.find(child => child.mother === mathers.name)
    );

  const womenAverageAge = womenFiltr.reduce((sum, women) => (
    sum + women.died - women.born
  ), 0) / womenFiltr.length;

  return womenAverageAge;
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
  const age = [];
  const hoIsWoman = people.filter(
    person => person.sex === 'f'
  );

  hoIsWoman.forEach((mather) => {
    const childrens = (people.filter(child => (
      child.mother === mather.name
    )));

    childrens.forEach((chaild) => {
      if (!onlyWithSon) {
        age.push(chaild.born - mather.born);
      } else {
        if (chaild.sex === 'm') {
          age.push(chaild.born - mather.born);
        }
      }
    });
  });

  const averageAgeDiff = age.reduce(
    (sum, difAge) => sum + difAge, 0) / age.length;

  return averageAgeDiff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
