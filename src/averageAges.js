'use strict';

function filterBySex(list, sex) {
  return list.filter(man => man.sex === sex);
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

function resultGiver(sum, array) {
  return sum / array.length;
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
  const mans = filterBySex(people, sex);

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

  const averageAge = century === undefined
    ? resultGiver(sumManAge, averageManAge)
    : resultGiver(sumManAgeInCentury, averageManAgeInCentury);

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
  const womans = filterBySex(people, sex);

  const womansWithChildren = womans.reduce((allWomansWithChildren, woman) => {
    const mothers = people.filter(person => person.mother === woman.name);

    !!mothers.length && allWomansWithChildren.push(woman);

    return allWomansWithChildren;
  }, []);

  const averageWomansAge = calculateAge(womans);

  const averageWomansAgeWithChildren = calculateAge(womansWithChildren);

  const sumWomanAge = sumAges(averageWomansAge);
  const sumWomanAgeWithChildren = sumAges(averageWomansAgeWithChildren);

  const averageAge = withChildren === true
    ? resultGiver(sumWomanAgeWithChildren, averageWomansAgeWithChildren)
    : resultGiver(sumWomanAge, averageWomansAge);

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
  const womans = filterBySex(people, sexWomans);

  const sexSons = 'm';
  const sons = filterBySex(people, sexSons);

  const ageKidsMothers = people.reduce((result, kid) => {
    womans.find(mom => {
      mom.name === kid.mother
        && result.push(kid.born - mom.born);
    });

    return result;
  }, []);

  const ageSonsMothers = sons.reduce((result, kid) => {
    womans.find(mom => {
      mom.name === kid.mother
        && result.push(kid.born - mom.born);
    });

    return result;
  }, []);

  const averageAgeKidsMothers = sumAges(ageKidsMothers);
  const averageAgeSonsMothers = sumAges(ageSonsMothers);

  const averageAge = onlyWithSon === true
    ? resultGiver(averageAgeSonsMothers, ageSonsMothers)
    : resultGiver(averageAgeKidsMothers, ageKidsMothers);

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
