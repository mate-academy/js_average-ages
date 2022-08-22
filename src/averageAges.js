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
  const men = people.filter(person => person.sex === 'm');
  const menAges = men.map(person => person.died - person.born);
  const menInCentury = men.filter(person => (
    Math.ceil(person.died / 100) === century
  ));
  const menAgesInCentury = menInCentury.map(human => human.died - human.born);

  return century
    ? average(menAgesInCentury, menInCentury)
    : average(menAges, men);
};

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
  const women = people.filter(person => person.sex === 'f');
  const womenAges = women.map(person => person.died - person.born);
  const womenWithChildren = women.filter(person =>
    people.some(human => human.mother === person.name
    ));
  const womenWithChildrenAge = womenWithChildren.map(person =>
    person.died - person.born
  );

  return withChildren
    ? average(womenWithChildrenAge, womenWithChildren)
    : average(womenAges, women);
};

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
const calculateAverageAgeDiff = (people, onlyWithSon) => {
  const childrenArray = people.filter(({ mother, sex }) => {
    const commonCheck = mother && people.some(({ name }) => name === mother);
    const onlyWithSonCheck = sex === 'm' && commonCheck;

    return onlyWithSon
      ? onlyWithSonCheck
      : commonCheck;
  });
  const sumOfDifferences = childrenArray.map(({ born, mother }) => {
    const motherPerson = people.find(({ name }) => name === mother);

    return motherPerson ? born - motherPerson.born : 0;
  }).reduce((acc, cur) => acc + cur, 0);

  return +(sumOfDifferences / childrenArray.length).toFixed(2);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

const average = (arr, arrLength) => {
  return +((arr.reduce((prevValue, currentValue) =>
    prevValue + currentValue, 0) / arrLength.length).toFixed(2));
};
