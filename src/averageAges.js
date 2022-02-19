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
const calculateAge = person => person.died - person.born;

const averageReducer = (arr) => {
  return arr.reduce((acc, i) => acc + calculateAge(i), 0) / arr.length;
};

function calculateMenAverageAge(people, century) {

  const targetGroup = people.filter(
    century
      ? item => item.sex === 'm' && Math.ceil(item.died / 100) === century
      : item => item.sex === 'm'
  );

  const averageAge = averageReducer(targetGroup);

  return +(averageAge.toFixed(2));
}

// replace `if ()` statement with &&, || or ?:
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
  function isMother(woman) {
    return people.some(person => person.mother === woman.name);
  };

  const targetGroup = people.filter(
    withChildren
      ? item => item.sex === 'f' && isMother(item)
      : item => item.sex === 'f');

  const averageAge = averageReducer(targetGroup);

  return +(averageAge.toFixed(2));
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
  const onlySons = people.filter(
    item => item.mother
    && item.sex === 'm'
    && people.some(person => person.name === item.mother));

  const differentAge = (mother, child) => mother.born - child.born;
  const diffAges = [];

  const mothersGroup = people.filter(
    onlyWithSon
      ? target => onlySons.some(person => person.mother === target.name)
      : target => people.some(person => person.mother === target.name));

  const childGroup = onlyWithSon
    ? onlySons
    : people.filter(person => mothersGroup.some(
      mother => mother.name === person.mother));

  for (const child of childGroup) {
    diffAges.push(differentAge(child, (mothersGroup.filter(
      mother => mother.name === child.mother))[0]));
  }

  const result = diffAges.reduce((acc, item) => acc + item) / diffAges.length;

  return +(result.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
