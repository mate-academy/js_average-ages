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

function getCentury(person) {
  return Math.ceil(person.died / 100);
}

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAverageAge(people) {
  return people
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / people.length;
}

function calculateMenAverageAge(people, century) {
  const menOfPeople = getPeopleBySex(people, 'm');
  const fromCentury = menOfPeople.filter(man => getCentury(man) === century);
  const scope = !century ? menOfPeople : fromCentury;

  return getAverageAge(scope);
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

function getListOfMothers(people) {
  const metionedAsMother = people
    .map(person => person.mother)
    .filter(motherName => motherName !== null);

  return people
    .filter(person => metionedAsMother
      .some(mother => mother === person.name));
}

function calculateWomenAverageAge(people, withChildren) {
  const womenOfPeople = getPeopleBySex(people, 'f');
  const scope = withChildren ? getListOfMothers(people) : womenOfPeople;

  return getAverageAge(scope);
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
  const scope = onlyWithSon ? getPeopleBySex(people, 'm') : people;
  const hasMother = scope.filter(person => person.mother);
  const hasMotherInList = hasMother
    .filter(son => people
      .some(person => person.name === son.mother));

  return hasMotherInList
    .map(child => {
      const kidsMom = people.find(person => person.name === child.mother);

      return child.born - kidsMom.born;
    })
    .reduce((a, b) => a + b, 0) / hasMotherInList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
