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
  const arrMen = people.filter(person => person.sex === 'm');
  const arrAgesMen = arrMen.map(person => person.died - person.born);
  const arrMenDiedInCentury = arrMen
    .filter(person => Math.ceil(person.died / 100) === century);
  const arrAgesMenDiedInCentury = arrMenDiedInCentury
    .map(person => person.died - person.born);
  const averageAgeMen = +(arrAgesMen.reduce((sum, current) => sum + current, 0)
  / arrAgesMen.length).toFixed(2);
  const averageAgeMenDiedInCentury = +(arrAgesMenDiedInCentury
    .reduce((sum, current) => sum + current, 0)
    / arrAgesMenDiedInCentury.length).toFixed(2);

  return arguments.length < 2 ? averageAgeMen : averageAgeMenDiedInCentury;

  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
}

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
  const arrWomen = people.filter(person => person.sex === 'f');
  const arrAgesWomen = arrWomen.map(person => person.died - person.born);
  const averageAgeWomen = +(arrAgesWomen
    .reduce((sum, current) => sum + current, 0)
    / arrAgesWomen.length).toFixed(2);
  const arrMothers = people.map(person => person.mother);
  const arrWomenWithChildren = arrWomen
    .filter(person => arrMothers.includes(person.name) === true);
  const arrAgesWomenWithChildren = arrWomenWithChildren
    .map(person => person.died - person.born);
  const averageAgeWomenWithChildren = +(arrAgesWomenWithChildren
    .reduce((sum, current) => sum + current, 0)
    / arrAgesWomenWithChildren.length).toFixed(2);

  return arguments.length < 2
    || withChildren !== true
    ? averageAgeWomen : averageAgeWomenWithChildren;
}

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
  const arrKeys = people
    .map(obj => Object.keys(obj));
  const arrValues = people
    .map(obj => Object.values(obj));
  const indexName = arrKeys[0].indexOf('name');
  const indexBorn = arrKeys[0].indexOf('born');
  const indexSex = arrKeys[0].indexOf('sex');
  const indexMother = arrKeys[0].indexOf('mother');
  const arrPersone = arrValues.map(arr => arr[indexName]);
  const arrSex = arrValues.map(arr => arr[indexSex]);
  const arrMothers = arrValues.map(arr => arr[indexMother]);
  const arrBorn = arrValues.map(arr => arr[indexBorn]);
  const arrIndexMothers = arrMothers
    .map(mother => arrPersone.indexOf(mother));
  const arrAgeDiff = arrIndexMothers
    .map((item, index) => arrBorn[index] - arrBorn[item]);
  const arrAgeDiffSon = arrIndexMothers
    .map((item, index) => arrSex[index] === 'm'
      ? arrBorn[index] - arrBorn[item]
      : NaN);
  const arrSortAgeDiff = arrAgeDiff.filter(item => isNaN(item) === false);
  const arrSortAgeDiffSon = arrAgeDiffSon.filter(item => isNaN(item) === false);
  const ageDiff = +(arrSortAgeDiff
    .reduce((sum, current) => sum + current, 0)
    / arrSortAgeDiff.length).toFixed(2);
  const ageDiffSon = +(arrSortAgeDiffSon
    .reduce((sum, current) => sum + current, 0)
    / arrSortAgeDiffSon.length).toFixed(2);

  return arguments.length < 2 || onlyWithSon !== true ? ageDiff : ageDiffSon;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
