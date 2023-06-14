'use strict';

function sameSex(list, sex) {
  return list.reduce((allMans, man) => {
    man.sex === sex && allMans.push(man);

    return allMans;
  }, []);
}

function sumAges(arrayAges) {
  return arrayAges.reduce((a, b) => a + b, 0);
}

function calculateAge(array) {
  return array.reduce((agesPerson, person) => {
    agesPerson.push(person.died - person.born);

    return agesPerson;
  }, []);
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
  const sex = 'm';
  const mans = sameSex(people, sex);

  const yearsInCentury = 100;

  const mansInCentury = mans.reduce((allMansInCentury, manInCentury) => {
    Math.ceil(manInCentury.died / yearsInCentury) === century
      && allMansInCentury.push(manInCentury);

    return allMansInCentury;
  }, []);

  const averageManAge = calculateAge(mans);

  const averageManAgeInCentury = calculateAge(mansInCentury);

  const sumManAge = sumAges(averageManAge);
  const sumManAgeInCentury = sumAges(averageManAgeInCentury);

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
  const sex = 'f';
  const womans = sameSex(people, sex);

  const womansWithChildren = womans.reduce((allWomansWithChildren, woman) => {
    const mothers = people.filter(person => person.mother === woman.name);

    mothers.length > 0 && allWomansWithChildren.push(woman);

    return allWomansWithChildren;
  }, []);

  const averageWomansAge = calculateAge(womans);

  const averageWomansAgeWithChildren = calculateAge(womansWithChildren);

  const sumWomanAge = sumAges(averageWomansAge);
  const sumWomanAgeWithChildren = sumAges(averageWomansAgeWithChildren);

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
  const sexWomans = 'f';
  const womans = sameSex(people, sexWomans);

  const sexSons = 'm';
  const sons = sameSex(people, sexSons);

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

  const averageAgeKidsMothers = sumAges(ageKidsMothers);
  const averageAgeSonsMothers = sumAges(ageSonsMothers);

  onlyWithSon === true
    ? res = averageAgeSonsMothers / ageSonsMothers.length
    : res = averageAgeKidsMothers / ageKidsMothers.length;

  return res;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
