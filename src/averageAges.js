'use strict';

/**
 * @param {[]} arrayOfObjects
 * @param {string} objectProperty
 *
 * @return {[]}
 */
function filteredPersonsBySex(arrayOfObjects, objectProperty) {
  return arrayOfObjects.filter(item => item.sex === objectProperty);
}

/**
 * @param {[]} array
 *
 * @return {number}
 */
function addAllYears(array) {
  return array.reduce((prevYear, nextYear) => (prevYear + nextYear), 0);
}

/**
 * @param {number} sumYearsDied
 * @param {number} sumYearsBorn
 * @param {number} divider
 *
 * @return {number}
 */
function returnRoundedAverageResult(sumYearsDied, sumYearsBorn, divider) {
  return Math.round(((sumYearsDied - sumYearsBorn) / divider) * 100) / 100;
}

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
  const allMen = filteredPersonsBySex(people, 'm');

  function returnResultWithoutCentury() {
    const dataMenDied = allMen.map(men => men.died);
    const dataMenBorn = allMen.map(men => men.born);

    return returnRoundedAverageResult(
      addAllYears(dataMenDied),
      addAllYears(dataMenBorn),
      allMen.length
    );
  }

  function returnResultWithCentury() {
    const filteredAllMenByCentury = allMen.filter(
      men => century === Math.ceil(men.died / 100)
    );
    const dataMenDiedInSpecifiedCentury = filteredAllMenByCentury.map(
      men => men.died
    );
    const dataMenBornInSpecifiedCentury = filteredAllMenByCentury.map(
      men => men.born
    );

    return returnRoundedAverageResult(
      addAllYears(dataMenDiedInSpecifiedCentury),
      addAllYears(dataMenBornInSpecifiedCentury),
      filteredAllMenByCentury.length
    );
  }

  return century === undefined
    ? returnResultWithoutCentury()
    : returnResultWithCentury();
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
  const allWomen = filteredPersonsBySex(people, 'f');

  function returnResultMotherStatusNotSpecified() {
    const dataWomenDied = allWomen.map(
      women => women.died
    );
    const dataWomenBorn = allWomen.map(
      women => women.born
    );

    return returnRoundedAverageResult(
      addAllYears(dataWomenDied),
      addAllYears(dataWomenBorn),
      allWomen.length
    );
  }

  function returnResultMotherStatusSpecified() {
    const filteredWomenWithChildren = people.filter(function(mother) {
      return people.find(function(children) {
        return children.mother === mother.name;
      });
    });
    const dataWomenDied = filteredWomenWithChildren.map(
      women => women.died
    );
    const dataWomenBorn = filteredWomenWithChildren.map(
      women => women.born);

    return returnRoundedAverageResult(
      addAllYears(dataWomenDied),
      addAllYears(dataWomenBorn),
      filteredWomenWithChildren.length
    );
  }

  return withChildren
    ? returnResultMotherStatusSpecified()
    : returnResultMotherStatusNotSpecified();
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
  const children = people.filter(function(child) {
    return people.find(function(mother) {
      return child.mother === mother.name;
    });
  });

  function returnResultOnlyWithSonNotSpecified() {
    const motherOfChildren = children.map(child => {
      return people.find(person => person.name === child.mother);
    });
    const dataChildrenBorn = children.map(child => child.born);
    const dataMotherBorn = motherOfChildren.map(child => child.born);

    return returnRoundedAverageResult(
      addAllYears(dataChildrenBorn),
      addAllYears(dataMotherBorn),
      children.length
    );
  }

  function returnResultOnlyWithSonSpecified() {
    const childrenSun = filteredPersonsBySex(children, 'm');
    const dataMotherOfSun = childrenSun.map(child => {
      return people.find(person => person.name === child.mother);
    });
    const dataChildrenBorn = childrenSun.map(child => child.born);
    const dataMotherBorn = dataMotherOfSun.map(child => child.born);

    return returnRoundedAverageResult(
      addAllYears(dataChildrenBorn),
      addAllYears(dataMotherBorn),
      childrenSun.length
    );
  }

  return onlyWithSon
    ? returnResultOnlyWithSonSpecified()
    : returnResultOnlyWithSonNotSpecified();
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
