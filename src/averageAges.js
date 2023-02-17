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
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menArr = people.filter((person) => person.sex === 'm');
  const arrAge = menArr.reduce((accumulator, man) => {
    if (century && Math.ceil(man.died / 100) !== century) {
      return accumulator;
    }

    const age = man.died - man.born;

    accumulator.push(age);

    return accumulator;
  }, []);

  const averageAge = arrAge
    .reduce((accumulator, age) => accumulator + age) / arrAge.length;

  return averageAge;
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
function calculateWomenAverageAge(people, withChildren) {
  const womArr = people.filter((person) => person.sex === 'f');
  const arrAge = womArr.reduce((accumulator, wom) => {
    if (withChildren && !('mother' in wom)) {
      return accumulator;
    }

    const children = people.filter((person) => person.mother === wom.name);

    if (withChildren && children.length === 0) {
      return accumulator;
    }

    const age = wom.died - wom.born;

    accumulator.push(age);

    return accumulator;
  }, []);
  const averageAge = arrAge
    .reduce((accumulator, age) => accumulator + age) / arrAge.length;

  return averageAge;
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
  // фільтруємо лише жінок
  const womenArr = people.filter((person) => person.sex === 'f');

  const mothersWithChildren = womenArr.reduce((acc, mother) => {
    const children = people
      .filter((person) => {
        return (person.mother === mother.name)
          && (!onlyWithSon || person.sex === 'm');
      });

    if (children.length > 0) {
      acc.push({
        mother, children,
      });
    }

    return acc;
  }, []);

  // пораховуємо вікові різниці між матерями та їх дітьми
  const ageDifferences = mothersWithChildren.map((entry) => {
    const { mother, children } = entry;
    const ageDiff = children.map((child) => {
      return child.born - mother.born;
    });

    return ageDiff;
  }).flat();

  // пораховуємо середню вікову різницю
  const avgAgeDiff = ageDifferences
    .reduce((acc, val) => acc + val, 0) / ageDifferences.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
