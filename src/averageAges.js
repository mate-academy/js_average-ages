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
  let age = 0;

  const m = people.filter(x => x.sex === 'm');
  const a = m.filter(x => Math.ceil(x.died / 100) === century);

  age = (century === undefined) ? m.map(x => x.died - x.born)
    : a.map(x => x.died - x.born);

  let result = age.reduce((sum, r) => sum + r, 0);

  result = result / age.length;

  return result;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let age = 0;

  const f = people.filter(x => x.sex === 'f');

  const m = people.map(x => (`${x.mother}`));

  const res = f.filter(x => m.includes(x.name));

  age = (withChildren === undefined) ? f.map(x => x.died - x.born)
    : res.map(x => x.died - x.born);

  let result = age.reduce((sum, r) => sum + r, 0);

  result = result / age.length;

  return result;
};

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let result = 0;

  const p = people;

  const ch = p.filter(x => p.find(mother => mother.name === x.mother));

  const o = p.filter(x => p.find(m => m.name === x.mother && x.sex === 'm'));

  const d = ch.map(c => c.born - (people.find(m => m.name === c.mother).born));

  const oD = o.map(c => c.born - (people.find(m => m.name === c.mother).born));

  let cResult = d.reduce((sum, r) => sum + r, 0);

  let oResult = oD.reduce((sum, r) => sum + r, 0);

  cResult = cResult / d.length;

  oResult = oResult / oD.length;

  result = (onlyWithSon === undefined) ? cResult
    : oResult;

  return result;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
