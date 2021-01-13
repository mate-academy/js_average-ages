'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const maleArr = people.filter(human => {
    return century
      ? Math.ceil(human.died / 100) === century
      && human.sex === `m` : human.sex === `m`;
  });

  const maleAgesArr = maleArr.map(man => man.died - man.born);

  return maleAgesArr.reduce((a, b) => a + b, 0) / maleAgesArr.length;
};

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const femaleArr = people.filter(human => {
    return withChildren
      ? people.some(child => human.name === child.mother)
      : human.sex === `f`;
  });

  const femaleAgesArr = femaleArr.map(woman => woman.died - woman.born);

  return femaleAgesArr.reduce((a, b) => a + b, 0) / femaleAgesArr.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothersArr = people.filter(mother =>
    people.some((child) => child.mother === mother.name)
  );
  const childsArr = people.filter(child => {
    return onlyWithSon
      ? mothersArr.some(mother => mother.name
                              === child.mother
                              && child.sex === `m`)
      : mothersArr.some(mother => mother.name === child.mother);
  });

  const mothersAgesDiff = childsArr.map(child => child.born - mothersArr
    .find(mother => mother.name === child.mother).born);

  return mothersAgesDiff.reduce((a, b) => a + b, 0) / mothersAgesDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
