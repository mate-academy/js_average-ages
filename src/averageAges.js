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
  const arrOfMens = people.filter(item => item.sex === 'm');

  if (!century) {
    const sumOfMensAge = arrOfMens.reduce((startValue, person) => {
      return startValue + (person.died - person.born);
    }, 0);

    const mensAverageAge = sumOfMensAge / arrOfMens.length;

    return mensAverageAge;
  } else {
    const mensOfCentury = arrOfMens.filter(
      (person) => {
        return Math.ceil(person.died / 100) === century;
      },
    );

    const sumOfCentury = mensOfCentury.reduce((startV, person) => {
      return startV + (person.died - person.born);
    }, 0);

    const averageAgeOfCentury = sumOfCentury / mensOfCentury.length;

    return averageAgeOfCentury;
  }
}

// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting

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
  if (!withChildren) {
    const arrOfWomens = people.filter(item => item.sex === 'f');
    const sumOfWomensAge = arrOfWomens.reduce((startValue, person) => {
      return startValue + (person.died - person.born);
    }, 0);
    const womensAverageAge = sumOfWomensAge / arrOfWomens.length;

    return womensAverageAge;
  }

  const mothersNames = people.map(person => person.mother);
  const mothers = people.filter(person =>
    mothersNames.includes(person.name));
  const sumOfMothers = mothers.reduce((startV, item) =>
    startV + (item.died - item.born), 0);
  const averageMothers = sumOfMothers / mothers.length;

  return averageMothers;
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
  const peopleNames = people.map(person =>
    person.name);

  let childs = people.filter(
    person => peopleNames.includes(person.mother));

  if (onlyWithSon) {
    childs = childs.filter(child => child.sex === 'm');
  }

  const ageDiff = childs.map(kid => {
    const mother = people.find(mom => mom.name === kid.mother);

    return kid.born - mother.born;
  });

  const sumOfAgeDiff = ageDiff.reduce((startV, diff) => startV + diff, 0);

  const averageAgeDiff = sumOfAgeDiff / ageDiff.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
