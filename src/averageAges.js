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

  const allMen = people.filter(elem => elem.sex === 'm');
  const deadMen = allMen.filter(elem => {
    return (Math.ceil(elem.died / 100) === century);
  });

  const averageAgeMen = century
    ? deadMen.reduce((middleAge, age) => middleAge + (age.died - age.born), 0)
    : allMen.reduce((middleAge, age) => middleAge + (age.died - age.born), 0);

  const amountMen = century ? deadMen : allMen;

  return (averageAgeMen / amountMen.length);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const mothers = people.filter(elem => elem.sex === 'f');
  const children = people.filter(mother =>
    people.some(child => {
      return child.mother === mother.name;
    }));

  const averageAgeWomen = withChildren
    ? children.reduce((sum, elem) => sum + (elem.died - elem.born), 0)
    : mothers.reduce((sum, elem) => sum + (elem.died - elem.born), 0);

  const amountWomen = withChildren ? children : mothers;

  return (averageAgeWomen / amountWomen.length);
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
  const result = [];
  let averageAge;

  if (!onlyWithSon) {
    people.forEach(mother =>
      people.map(child => {
        if (mother.name === child.mother) {
          result.push(child.born - mother.born);
        }
      })
    );
    averageAge = result.reduce((accum, elem) => accum + elem, 0);
  } else {
    people.forEach(mother =>
      people.forEach(son => {
        if (mother.name === son.mother && son.sex === 'm') {
          result.push(son.born - mother.born);
        }
      })
    );
    averageAge = result.reduce((accum, elem) => accum + elem, 0);
  }

  return averageAge / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
