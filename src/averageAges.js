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
  let men = people.filter((x) => x.sex === 'm');

  if (century) {
    men = men.filter((x) => Math.ceil(x.died / 100) === century);
  }

  const age = men.map((x) => x.died - x.born).reduce((a, b) => a + b);

  return +(age / men.length).toFixed(2);
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
  let women = people.filter((x) => x.sex === 'f');
  const mothers = people
    .filter((x) => x.mother !== null)
    .reduce((a, b) => `${a},${b.mother}`, [])
    .split(',');

  mothers.shift();

  if (withChildren) {
    women = women.filter((x) => mothers.includes(x.name));
  }

  const age = women.map((x) => x.died - x.born).reduce((a, b) => a + b);

  return +(age / women.length).toFixed(2);
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
  const mothersArr = people
    .filter((x) => x.mother !== null)
    .reduce((a, b) => `${a},${b.mother}`, [])
    .split(',');

  mothersArr.shift();

  const mothers = people.filter((x) => mothersArr.includes(x.name));

  const mothersArrShort = mothers
    .reduce((a, b) => `${a},${b.name}`, [])
    .split(',');

  mothersArrShort.shift();

  let children = people.filter((x) => mothersArrShort.includes(x.mother));

  if (onlyWithSon) {
    children = children.filter((x) => x.sex === 'm');
  }

  const mothersPlus = [];

  for (let i = 0; i < children.length; i++) {
    for (let j = 0; j < mothers.length; j++) {
      if (children[i].mother === mothers[j].name) {
        mothersPlus.push(mothers[j]);
      }
    }
  }

  const childrenAge = children.reduce((a, b) => a + b.born, 0);

  const mothersAge = mothersPlus.reduce((a, b) => a + b.born, 0);

  return +(childrenAge / children.length - mothersAge / mothersPlus.length)
    .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
