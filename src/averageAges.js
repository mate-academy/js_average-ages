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
  const reducer = (a, b) => a + b;

  const men = people.filter((person) => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const arrAges = men.map(person => person.died - person.born);

  const averageAge = arrAges.reduce(reducer) / men.length;

  return +averageAge.toFixed(2);

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
  const reducer = (a, b) => a + b;

  const arrWomen = withChildren
    ? people.filter((person) => {
      const trueMother = people.some((female) => {
        return female.mother === person.name;
      });

      return trueMother && person.sex === 'f';
    })
    : people.filter((person) => {
      return person.sex === 'f';
    });

  const arrAgesWomen = arrWomen.map(person => person.died - person.born);

  const resultAverageAge = arrAgesWomen.reduce(reducer) / arrAgesWomen.length;

  return +resultAverageAge.toFixed(2);
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
  const reducer = (a, b) => a + b;
  // const yearsDiff = [];

  // if (onlyWithSon) {
  //   people.forEach((mother) => {
  //     people.forEach((person) => {
  //       if (person.sex === 'm' && person.mother === mother.name) {
  //         yearsDiff.push(person.born - mother.born);
  //       };
  //     });
  //   });
  // } else {
  //   people.forEach((mother) => {
  //     people.forEach((person) => {
  //       if (person.mother === mother.name) {
  //         yearsDiff.push(person.born - mother.born);
  //       };
  //     });
  //   });
  // };

  const arrChildren = onlyWithSon
    ? people.filter((child) => {
      return child.sex === 'm'
        && people.some((mother) => child.mother === mother.name);
    })
    : people.filter((child) => {
      return people.some((mother) => child.mother === mother.name);
    });

  const ageDiff = arrChildren.map((child) =>
    child.born - people.find((mother) => child.mother === mother.name).born);

  const resultAgeDiff = ageDiff.reduce(reducer) / ageDiff.length;

  return +resultAgeDiff.toFixed(2);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
