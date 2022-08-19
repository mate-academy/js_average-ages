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
  const menOnCentury = (person) => (
    !century || century === Math.ceil(person.died / 100)
  );

  const menAges = people.filter(
    person => person.sex === 'm' && menOnCentury(person)
  );

  return reduceShortening(menAges) / menAges.length;
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
  const withChild = people.filter(person =>
    person.sex === 'f' && people.find(kin =>
      person.name === kin.mother)
  );

  const onlyWomanAge = !withChildren
    ? people.filter(person => person.sex === 'f')
    : withChild;

  return reduceShortening(onlyWomanAge) / onlyWomanAge.length;
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
  const withSon = (person, child) =>
    person.find(parent => parent.name === child.mother);

  const ageDiff = !onlyWithSon
    ? people.filter(kid => withSon(people, kid))
    : people.filter(kid => withSon(people, kid) && kid.sex === 'm');

  const totalAgeDiff = ageDiff.reduce((age, kid) =>
    age + kid.born - people.find(mother => (
      kid.mother === mother.name)).born, 0) / ageDiff.length;

  return totalAgeDiff;
}

function reduceShortening(bunchOfPeople) {
  return bunchOfPeople.reduce(
    (sum, person) => sum + person.died - person.born, 0
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
