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
  const men = people.filter(person => person.sex === 'm'
        && (century ? century === Math.ceil(person.died / 100) : true));
  const menAgesSum = getAgesSum(men);
  const menAverageAge = getAverageAge(menAgesSum, men.length);

  return menAverageAge;
};

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
  const women = people.filter(person => (
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  ));

  const womenAgesSum = getAgesSum(women);
  const womenAverageAge = getAverageAge(womenAgesSum, women.length);

  return womenAverageAge;
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
  const children = people.filter(child =>
    onlyWithSon
      ? people.find(mother => child.mother === mother.name)
      && child.sex === 'm'
      : people.find(mother => child.mother === mother.name)
  );
  const ageDifferenceSum = children.reduce((sum, child) =>
    sum + child.born - people.find(
      mother => child.mother === mother.name
    ).born, 0
  );

  return getAverageAge(ageDifferenceSum, children.length);
};

const getAgesSum = (filtratedPeople) =>
  filtratedPeople.reduce(
    (sum, year) => (sum + year.died - year.born), 0);

const getAverageAge = (sum, peopleAmount) =>
  Math.round(sum / peopleAmount * 100) / 100;

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
