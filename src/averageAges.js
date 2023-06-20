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
  const men = people.filter((man) => man.sex === 'm');
  const diedInCentury = men.filter((menDied) =>
    Math.ceil(menDied.died / 100) === century);

  const ageOfMenCentury = diedInCentury.map((el) => el.died - el.born);
  const ageOfMan = men.map((el) => el.died - el.born);

  const averageAgeOfMenCentury = ageOfMenCentury
    .reduce((prevAge, currentAge) => {
      return prevAge + currentAge;
    }, 0);

  const averageAgeOfMen = ageOfMan.reduce((prevAge, currentAge) => {
    return prevAge + currentAge;
  }, 0);

  return century
    ? averageAgeOfMenCentury / diedInCentury.length
    : averageAgeOfMen / ageOfMan.length;
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter((woman) => woman.sex === 'f');
  const womenWithChildren = people
    .filter((person) => people.some((child) => person.name
      .includes(child.mother)));

  const ageOfWomen = women.map((woman) => woman.died - woman.born);
  const ageOfWomenWithChildren = womenWithChildren
    .map((woman) => woman.died - woman.born);

  const averageAgeOfWomen = ageOfWomen.reduce((prevAge, currentAge) => {
    return prevAge + currentAge;
  }, 0);
  const averageAgeOfWomenWithChildren = ageOfWomenWithChildren
    .reduce((prevAge, currentAge) => {
      return prevAge + currentAge;
    }, 0);

  return withChildren
    ? averageAgeOfWomenWithChildren / womenWithChildren.length
    : averageAgeOfWomen / women.length;
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
  const filteredPeople = onlyWithSon
    ? people.filter(person => person.sex === 'm') : people;

  const ageDiffs = filteredPeople
    .filter(person => person.mother && people
      .find(p => p.name === person.mother))
    .map(person => {
      const mother = people.find(p => p.name === person.mother);

      return person.born - mother.born;
    });

  const totalAgeDiff = ageDiffs.reduce((prev, current) => prev + current, 0);
  const pairCount = ageDiffs.length;

  if (pairCount === 0) {
    return 0;
  }

  const averageAgeDifference = totalAgeDiff / pairCount;

  return averageAgeDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
