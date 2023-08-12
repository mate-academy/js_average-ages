'use strict';

function getAverengeAge(listOfPeople) {
  const sumAge = listOfPeople.map((person) => person.died - person.born)
    .reduce((acc, value) => acc + value, 0);

  return sumAge / listOfPeople.length;
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
  const menList = people.filter((person) => person.sex === 'm');
  const menFromCentury = menList
    .filter((man) => Math.ceil(man.died / 100) === century);

  return (!century)
    ? getAverengeAge(menList)
    : getAverengeAge(menFromCentury);
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
  const womenList = people.filter(person => person.sex === 'f');
  const womenWitnChildren = people.filter(person =>
    people.some(motherName => motherName.mother === person.name)
  );

  return (!withChildren)
    ? getAverengeAge(womenList)
    : getAverengeAge(womenWitnChildren);
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
  const peopleWhitMother = people.filter(person => !onlyWithSon
    ? people.find(women => person.mother === women.name)
    : (people.find(women => person.mother === women.name
      && person.sex === 'm')
    ));

  const womenMother = people.filter(mother =>
    peopleWhitMother.some(child => mother.name === child.mother));

  const sumOfDifference = peopleWhitMother
    .map(child => {
      const motherOfPerson = womenMother
        .find(woman => woman.name === child.mother);

      return child.born - motherOfPerson.born;
    })
    .reduce((acc, value) => acc + value, 0);

  return sumOfDifference / peopleWhitMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
