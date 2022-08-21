'use strict';

/**
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
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const whoIsWoman = people.filter(person => person.sex === 'f');

  const womenFiltr = !withChildren
    ? whoIsWoman
    : whoIsWoman.filter(
      mather => people.some(child => child.mother === mather.name)
    );

  const womenAverageAge = womenFiltr.reduce((sum, women) => (
    sum + women.died - women.born
  ), 0) / womenFiltr.length;

  return womenAverageAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const age = [];
  const whoIsWoman = people.filter(
    person => person.sex === 'f'
  );

  whoIsWoman.forEach((mother) => {
    const children = (people.filter(child => (
      child.mother === mother.name
    )));

    children.forEach((child) => {
      if (!onlyWithSon) {
        age.push(child.born - mother.born);
      } else {
        if (child.sex === 'm') {
          age.push(child.born - mother.born);
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
