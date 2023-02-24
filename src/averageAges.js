'use strict';

const MAN = 'm';
const WOMAN = 'f';
const COUNT = 0;

const lifeTime = (born, died) => {
  return (died - born);
};

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
  const listOfMen = people.filter(({ sex, died }) => {
    return (sex === MAN) && (
      century
        ? Math.ceil(died / 100) === century
        : true
    );
  });
  const averageAge = listOfMen.reduce(
    (acc, { born: manBorn, died: manDied }) => {
      return acc + lifeTime(manBorn, manDied);
    }, COUNT);

  return averageAge / listOfMen.length;
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
  const listOfWomen = people.filter(({ name, sex }) => {
    return (sex === WOMAN) && (
      withChildren
        ? (people.some(({ mother }) => mother === name))
        : true
    );
  });
  const averageAge = listOfWomen.reduce(
    (acc, { born: womanBorn, died: womanDied }) => {
      return acc + lifeTime(womanBorn, womanDied);
    }, COUNT);

  return averageAge / listOfWomen.length;
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
  const children = people.filter(({ mother, sex }) => (
    people.some(({ name }) => name === mother) && (
      onlyWithSon
        ? sex === MAN
        : true
    )
  ));

  const differenceOfAge = children.reduce(
    (acc, { mother, born: childBorn }) => {
      const { born: motherBorn } = people.find(({ name }) => mother === name);

      return acc + (childBorn - motherBorn);
    }, COUNT);

  return differenceOfAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
