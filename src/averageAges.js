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
  const male = people.filter(person => person.sex === 'm');
  const centuryDied = male.filter(man => Math.ceil(man.died / 100) === century);

  const age
    = (!century)
      ? male.map(man => man.died - man.born)
      : centuryDied.map(man => man.died - man.born);

  const result = age.reduce((sum, r) => sum + r, 0) / age.length;

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
  const female = people.filter(person => person.sex === 'f');

  const mothers = people.map(woman => (`${woman.mother}`));

  const hasChild = female.filter(woman => mothers.includes(woman.name));

  const age
    = (!withChildren)
      ? female.map(woman => woman.died - woman.born)
      : hasChild.map(woman => woman.died - woman.born);

  const result = age.reduce((sum, r) => sum + r, 0) / age.length;

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
  const kidsWithMother = people.filter(kid =>
    people.find(mother => mother.name === kid.mother));

  const sonsWithMothers = people.filter(kid =>
    people.find(mother => mother.name === kid.mother && kid.sex === 'm'));

  const kidsMotherDiff = kidsWithMother.map(kid =>
    kid.born - (people.find(mother => mother.name === kid.mother).born));

  const sonsMothersDiff = sonsWithMothers.map(kid =>
    kid.born - (people.find(mother => mother.name === kid.mother).born));

  const cResult
    = kidsMotherDiff.reduce((sum, r) => sum + r, 0) / kidsMotherDiff.length;

  const oResult
    = sonsMothersDiff.reduce((sum, r) => sum + r, 0) / sonsMothersDiff.length;

  const result
    = (!onlyWithSon)
      ? cResult
      : oResult;

  return result;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
