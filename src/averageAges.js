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
const getSum = (a, b) => a + b;

const getBySex = (people, sex) => people.filter(person => person.sex === sex);

const calculateAverageAge = people => people.map(
  (person) => person.died - person.born).reduce(getSum, 0) / people.length;

function calculateMenAverageAge(people, century) {
  let men = getBySex(people, 'm');

  const menInCentury = men.filter(
    person => Math.ceil(person.died / 100) === century
  );

  men = !century
    ? men
    : menInCentury;

  return calculateAverageAge(men);
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
  let women = getBySex(people, 'f');

  const womenHadKid = women.filter(
    mother => people.some(kid => kid.mother === mother.name)
  );

  women = !withChildren
    ? women
    : womenHadKid;

  return calculateAverageAge(women);
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
  let children = people.filter(
    kid => people.some(mother => mother.name === kid.mother)
  );

  const sons = getBySex(children, 'm');

  children = !onlyWithSon
    ? children
    : sons;

  const ageDifferences = children.map(kid => {
    const mother = people.find(person => person.name === kid.mother).born;
    const ageDifference = kid.born - mother;

    return ageDifference;
  });

  const averageAgeDiff = ageDifferences.reduce(getSum, 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
