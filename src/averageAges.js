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
  const allMen = people.filter((person) => {
    return person.sex === 'm';
  });

  function sumOfAllMenAges(men) {
    return men.reduce((acc, person) => {
      return acc + (person.died - person.born);
    }, 0);
  }

  const averageAgeOfAllMen = sumOfAllMenAges(allMen) / allMen.length;

  const menDiedInCentury = allMen.filter((men) => {
    return Math.ceil((men.died / 100)) === century;
  });
  const averageAgeOfAllDiedMen
  = sumOfAllMenAges(menDiedInCentury) / menDiedInCentury.length;

  return century === undefined ? averageAgeOfAllMen : averageAgeOfAllDiedMen;
}

/**
 * Implement calculateWomenAverageAge function
 *
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter((person) => person.sex === 'f');

  function sumOfAllWomenAges(women) {
    return women.reduce((acc, person) => {
      return acc + (person.died - person.born);
    }, 0);
  }

  const averageAllWomenAges = sumOfAllWomenAges(allWomen) / allWomen.length;

  const womenWithChildren = allWomen.filter((women) => {
    return people.some((person) => {
      return person.mother === women.name;
    });
  });
  const womenWithChildrenAvarageAges
  = sumOfAllWomenAges(womenWithChildren) / womenWithChildren.length;

  return withChildren === undefined
    ? averageAllWomenAges : womenWithChildrenAvarageAges;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const childrenWithMother = people.filter((child) => {
    return child.mother !== null && people.some((mother) => {
      return mother.name === child.mother;
    });
  });
  const ageDiff = childrenWithMother.reduce((acc, child) => {
    return acc + (child.born) - (people.find((mother) => {
      return mother.name === child.mother;
    }).born);
  }, 0) / childrenWithMother.length;

  const menWithMother = childrenWithMother.filter((kid) => kid.sex === 'm');
  const ageDiffOfMenAndMother = menWithMother.reduce((acc, child) => {
    return acc + (child.born) - (people.find((mother) => {
      return mother.name === child.mother;
    }).born);
  }, 0) / menWithMother.length;

  return onlyWithSon === undefined ? ageDiff : ageDiffOfMenAndMother;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
