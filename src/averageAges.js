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
  const men = people.filter(({ sex }) => sex === 'm');
  let result;

  if (arguments.length === 2) {
    const menInCentury = men.filter(({ died }) => {
      return Math.ceil(died / 100) === century;
    })
      .map(({ born, died }) => died - born);

    const avarageCentury = menInCentury.reduce((a, b) => {
      return a + b;
    }) / menInCentury.length;

    result = avarageCentury;
  } else {
    const allMenAges = men.map(({ born, died }) => died - born);
    const avarage = allMenAges.reduce((a, b) => {
      return a + b;
    }) / men.length;

    result = avarage;
  }

  return result;
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
  if (withChildren) {
    const whithMother = people.filter((item) => item.mother !== null);
    const mothersNames = [];

    whithMother.forEach(element => {
      if (mothersNames.indexOf(element.mother) === -1) {
        mothersNames.push(element.mother);
      }
    });

    const mothers = people.filter((x) => mothersNames.indexOf(x.name) !== -1);
    const mothersAge = mothers
      .map(({ born, died }) => {
        return died - born;
      })
      .reduce((a, b) => {
        return a + b;
      }) / mothers.length;

    return mothersAge;
  } else {
    const women = people.filter(({ sex }) => {
      return sex === 'f';
    });

    const womenAverage = women
      .map(({ born, died }) => {
        return died - born;
      })
      .reduce((a, b) => {
        return a + b;
      }) / women.length;

    return womenAverage;
  }
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
  const children = people.filter(child => onlyWithSon
    ? people.find(mother => mother.name === child.mother) && child.sex === 'm'
    : people.find(mother => mother.name === child.mother));

  let age = 0;

  children.forEach(element => {
    const mother = people.find(item => item.name === element.mother)
    
    age += element.born - mother.born;
  });
  age /= children.length;

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
