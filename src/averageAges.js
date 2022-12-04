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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const totalAge = people.map(human => human.sex === 'm'
    ? human.died - human.born : 0);

  const totalAgeCentury = people.map(
    human => Math.ceil(human.died / 100) === century
    && human.sex === 'm' ? human.died - human.born : 0
  );

  const womenFiltered = totalAge.filter(year => year > 0);

  const filteredCentury = totalAgeCentury.filter(year => year > 0);

  const avarageMaleAge = womenFiltered.reduce((a, b) => a + b, 0);

  const avarageMaleAgeCentury = filteredCentury.reduce((a, b) => a + b, 0);

  let final = 0;

  century > 0 ? final
    = avarageMaleAgeCentury / filteredCentury.length
    : final = avarageMaleAge / womenFiltered.length;

  return final;
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
  // write code here
  const women = people.map(human => human.sex === 'f' ? human : 0);

  const womenFiltered = women.filter(woman => woman !== 0);

  const ageArray = womenFiltered.map(woman => woman.died - woman.born);

  const totalAgeSum = ageArray.reduce((a, b) => a + b, 0);

  const mothers = people.filter(
    son => womenFiltered.find(mother => mother.name === son.mother)
  );
  const children = womenFiltered.filter(
    mother => mothers.find(son => mother.name === son.mother)
  );

  const ageArrayWithChild = children.map(child => child.died - child.born);

  const totalAgeSumChild = ageArrayWithChild.reduce((a, b) => a + b, 0);

  let result = 0;

  withChildren === true ? result = totalAgeSumChild / ageArrayWithChild.length
    : result = totalAgeSum / ageArray.length;

  return +result.toFixed(2);
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
  // write code here
  const womenMess = people.map(woman => woman.sex === 'f' ? woman : 0);

  const women = womenMess.filter(woman => woman !== 0);

  const children = people.filter(
    child => women.find(mother => mother.name === child.mother)
  );

  const sons = children.filter(son => son.sex === 'm');

  const mothers = women.filter(
    woman => children.find(child => woman.name === child.mother)
  );

  let differenceArray = 0;

  differenceArray = onlyWithSon === true
    ? sons.map(
      child => child.born - mothers.find(
        mother => child.mother === mother.name).born
    )
    : children.map(
      child => child.born - mothers.find(
        mother => child.mother === mother.name).born);

  const totalDifference = differenceArray.reduce((a, b) => a + b, 0);

  return +(totalDifference / differenceArray.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
