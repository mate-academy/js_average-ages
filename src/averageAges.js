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
 * write code here
 * avoid using loop and forEach
 * replace `if ()` statement with &&, || or ?:
 * without nesting
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const mans = people.reduce((allMans, man) => {
    man.sex === 'm' && allMans.push(man);

    return allMans;
  }, []);

  const mansInCentury = mans.reduce((allMansInCentury, manInCentury) => {
    Math.ceil(manInCentury.died / 100) === century
      && allMansInCentury.push(manInCentury);

    return allMansInCentury;
  }, []);

  const averageManAge = mans.reduce((agesMans, man) => {
    agesMans.push(man.died - man.born);

    return agesMans;
  }, []);

  const averageManAgeInCentury = mansInCentury
    .reduce((agesMansInCentury, manAgeInCentury) => {
      agesMansInCentury.push(manAgeInCentury.died - manAgeInCentury.born);

      return agesMansInCentury;
    }, []);

  const sumManAge = averageManAge.reduce((a, b) => a + b, 0);
  const sumManAgeInCentury = averageManAgeInCentury.reduce((a, b) => a + b, 0);

  let averageAge = 0;

  century === undefined
    ? averageAge = sumManAge / averageManAge.length
    : averageAge = sumManAgeInCentury / averageManAgeInCentury.length;

  return averageAge;
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
  const womans = people.reduce((allWomans, woman) => {
    woman.sex === 'f' && allWomans.push(woman);

    return allWomans;
  }, []);

  const womansWithChildren = womans.reduce((allWomansWithChildren, woman) => {
    const mothers = people.filter(person => person.mother === woman.name);

    mothers.length > 0 && allWomansWithChildren.push(woman);

    return allWomansWithChildren;
  }, []);

  const averageWomansAge = womans.reduce((agesWomans, woman) => {
    agesWomans.push(woman.died - woman.born);

    return agesWomans;
  }, []);

  const averageWomansAgeWithChildren = womansWithChildren
    .reduce((agesWomans, woman) => {
      agesWomans.push(woman.died - woman.born);

      return agesWomans;
    }, []);

  const sumWomanAge = averageWomansAge.reduce((a, b) => a + b, 0);
  const sumWomanAgeWithChildren = averageWomansAgeWithChildren
    .reduce((a, b) => a + b, 0);

  let averageAge = 0;

  withChildren === true
    ? averageAge = sumWomanAgeWithChildren / averageWomansAgeWithChildren.length
    : averageAge = sumWomanAge / averageWomansAge.length;

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
function calculateAverageAgeDiff(people, onlyWithSon) {
  const womans = people.reduce((allWomans, woman) => {
    woman.sex === 'f' && allWomans.push(woman);

    return allWomans;
  }, []);

  const sons = people.reduce((allWomans, woman) => {
    woman.sex === 'm' && allWomans.push(woman);

    return allWomans;
  }, []);

  const ageKidsMothers = people.reduce((result, kid) => {
    womans.forEach(element => {
      element.name === kid.mother
        && result.push(kid.born - element.born);
    });

    return result;
  }, []);

  const ageSonsMothers = sons.reduce((result, kid) => {
    womans.forEach(element => {
      element.name === kid.mother
        && result.push(kid.born - element.born);
    });

    return result;
  }, []);

  let res = 0;

  const averageAgeKidsMothers = ageKidsMothers.reduce((a, b) => a + b, 0);
  const averageAgeSonsMothers = ageSonsMothers.reduce((a, b) => a + b, 0);

  onlyWithSon === true
    ? res = averageAgeSonsMothers / ageSonsMothers.length
    : res = averageAgeKidsMothers / ageKidsMothers.length;

  return res;
}

// calculateAverageAgeDiff(people);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
