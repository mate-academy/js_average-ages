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
  let man = [];

  man = people.filter((person) => person.sex === 'm');

  if (century) {
    man = man.filter((person) => Math.ceil(person.died / 100) === century);
  }

  return calculateAgeSum(man) / man.length;
  // write code here
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
function calculateAgeSum(filteredGroup) {
  return filteredGroup.reduce(
    (prev, person) => prev + (person.died - person.born),
    0
  );
}

function calculateWomenAverageAge(people, withChildren) {
  let woman = [];

  woman = people.filter((person) => person.sex === 'f');

  if (withChildren) {
    woman = woman.filter((person) =>
      people.some((otherPerson) => otherPerson.mother === person.name)
    );
  }

  return calculateAgeSum(woman) / woman.length;
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const resultArr = [];
  let peopleArr = people.filter((person) => person.mother !== null);

  if (onlyWithSon) {
    peopleArr = peopleArr.filter((person) => person.sex === 'm');
  }

  peopleArr.forEach(person => {
    const mother = people.find(mum => person.mother === mum.name);

    if (mother) {
      const diff = (person.born - mother.born);

      resultArr.push(diff);
    }
  });

  return resultArr.reduce((prev, item) => prev + item) / resultArr.length;
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
