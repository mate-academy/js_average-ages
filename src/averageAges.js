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
const maleSex = 'm';
const femaleSex = 'f';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    isMale(person)
    && (century
      ? (Math.ceil(person.died / 100) === century)
      : true)
  );

  return getAverageAge(men);
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(person =>
    isFemale(person)
    && (withChildren
      ? people.some(child =>
        child.mother === person.name)
      : true)
  );

  return getAverageAge(women);
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
  const childrens = people.filter(
    person =>
      people.some(mother => mother.name === person.mother)
        && (onlyWithSon
          ? isMale(person)
          : true)
  );

  return childrens.reduce((sum, child) => {
    const mother = people.find(
      person =>
        child.mother === person.name
    );

    return sum + (child.born - mother.born);
  }, 0) / childrens.length;
}

function getSex(sex) {
  return person => person.sex === sex;
}

function getAge(person) {
  return person.died - person.born;
}

function getAverageAge(people) {
  return +(people.reduce((sum, person) =>
    sum + getAge(person), 0) / people.length
  ).toFixed(2);
}

const isMale = getSex(maleSex);
const isFemale = getSex(femaleSex);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
