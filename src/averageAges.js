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
  const manArr = people.filter(human =>
    century
      ? Math.ceil(human.died / 100) === century && human.sex === 'm'
      : (human.sex === 'm')
  );

  const sumAge = manArr
    .reduce((sum, years) => sum + (years.died - years.born), 0);

  return sumAge / manArr.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const womanArr = people.filter(human => human.sex === 'f');
  let result;

  withChildren
    ? result = womanArr
      .filter(woman => people
        .some(person => person.mother === woman.name))
    : result = womanArr;

  return result
    .map(person => person.died - person.born)
    .reduce((sum, ages) => sum + ages) / result.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => onlyWithSon
    ? people.some(mother => mother.name === child.mother) && child.sex === 'm'
    : people.some(mother => mother.name === child.mother));

  const resultDifferenc = children
    .map(child => child.born - people
      .find(mother => child.mother === mother.name).born);

  return resultDifferenc
    .reduce((total, current) =>
      total + current, 0) / resultDifferenc.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
