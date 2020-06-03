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
  let menAverage = 0;
  const men = people.filter(person => person.sex === 'm');

  if (century !== undefined) {
    const menCentury = men
      .filter(man => Math.ceil(man.died / 100) === century);

    menAverage = menCentury
      .reduce((accumulator, item) => accumulator + (item.died - item.born), 0)
      / menCentury.length;
  } else {
    menAverage = men
      .reduce((accumulator, item) => accumulator + (item.died - item.born), 0)
      / men.length;
  }

  return parseFloat(menAverage.toFixed(2));
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
  let womenAverage = 0;
  const mothers = [];
  const women = people.filter(person => person.sex === 'f');

  if (withChildren === true) {
    for (const person of people) {
      if (person.mother !== null) {
        mothers.push(Object.values(person.mother).join(''));
      }
    }

    const womenWithChildren = women
      .filter(woman => mothers.includes(woman.name));

    womenAverage = womenWithChildren
      .reduce((accumulator, item) => accumulator + (item.died - item.born), 0)
      / womenWithChildren.length;
  } else {
    womenAverage = women
      .reduce((accumulator, item) => accumulator + (item.died - item.born), 0)
      / women.length;
  }

  return parseFloat(womenAverage.toFixed(2));
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
  const peopleCopy = [...people];
  let averageAgeDiff = 0;

  for (let i = 0; i < peopleCopy.length; i++) {
    for (let j = 0; j < peopleCopy.length; j++) {
      if (peopleCopy[j].name === peopleCopy[i].mother) {
        peopleCopy[i].motherBorn = peopleCopy[j].born;
      }
    }
  }

  const numberOfChildren = people
    .filter(person => person.motherBorn !== undefined).length;
  const numberOfSons = people
    .filter(person =>
      person.motherBorn !== undefined && person.sex === 'm').length;

  if (onlyWithSon === true) {
    averageAgeDiff = peopleCopy
      .filter(person => person.sex === 'm' && person.motherBorn !== undefined)
      .reduce((accumulator, item) =>
        accumulator + (item.born - item.motherBorn), 0)
      / numberOfSons;
  } else {
    averageAgeDiff = peopleCopy
      .filter(person => person.motherBorn !== undefined)
      .reduce((accumulator, item) =>
        accumulator + (item.born - item.motherBorn), 0)
      / numberOfChildren;
  }

  return parseFloat(averageAgeDiff.toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
