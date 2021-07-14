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
  function sex(person) {
    return person.sex === 'm';
  };

  function whichCentury(person) {
    const centuryOfDeath = Math.ceil(person.died / 100);

    return centuryOfDeath === century ? person : null;
  };

  function findAvg(sum, person) {
    return sum + person.died - person.born;
  }

  const males = people.filter(sex);

  const malesC = males.filter(whichCentury);

  const countMales = males.length;

  const countMalesC = malesC.length;

  const malesAvg = +(males.reduce(findAvg, 0) / countMales).toFixed(2);

  const centAvg = +(malesC.reduce(findAvg, 0) / countMalesC).toFixed(2);

  const resultAge = century ? centAvg : malesAvg;

  return resultAge;
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
  function sex(person) {
    return person.sex === 'f';
  };

  function isMother(person, index) {
    const hasChildren = people.some(item =>
      item.mother === people[index].name);

    return hasChildren === true ? person : null;
  };

  function femaleAge(sum, person) {
    return sum + person.died - person.born;
  };

  function motherAge(sum, person) {
    return sum + person.died - person.born;
  };

  const females = people.filter(sex);

  const mothers = people.filter(isMother);

  const countFemalesAges = females.reduce(femaleAge, 0);

  const countMothersAges = mothers.reduce(motherAge, 0);

  const femaleAvg = +(countFemalesAges / females.length).toFixed(2);

  const mothersAvg = +(countMothersAges / mothers.length).toFixed(2);

  const resultAge = withChildren ? mothersAvg : femaleAvg;

  return resultAge;
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
  function isChild(child) {
    return people.some((mother) => {
      return mother.name === child.mother;
    });
  };

  function isSon(son) {
    return people.some((mother) => {
      return mother.name === son.mother && son.sex === 'm';
    });
  };

  function isMother(mother) {
    return people.some((child) => {
      return child.mother === mother.name;
    });
  };

  function hasSons(mother) {
    return people.some((son) => {
      return son.mother === mother.name && son.sex === 'm';
    });
  };

  const children = people.filter(isChild);

  const sons = people.filter(isSon);

  const mothers = people.filter(isMother);

  const mothersWithSons = people.filter(hasSons);

  function findDiff(child) {
    const isMom = mothers.find((mom) => {
      return child.mother === mom.name;
    });

    return child.born - isMom.born;
  };

  function findSonsDiff(child) {
    const isMotherWithSon = mothersWithSons.find((mom) => {
      return child.mother === mom.name;
    });

    return child.born - isMotherWithSon.born;
  };

  const childrenAgeArr = children.map(findDiff);

  const sonsAgeArr = sons.map(findSonsDiff);

  function countChildrenAges(sum, item) {
    return sum + item;
  };

  function countSonsAges(sum, item) {
    return sum + item;
  };

  const motherChildSum = childrenAgeArr.reduce(countChildrenAges, 0);

  const motherSonSum = sonsAgeArr.reduce(countSonsAges);

  const motherChildDiff = +(motherChildSum / children.length).toFixed(2);

  const motherSonDiff = +(motherSonSum / sons.length).toFixed(2);

  const resultDiff = onlyWithSon ? motherSonDiff : motherChildDiff;

  return resultDiff;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
