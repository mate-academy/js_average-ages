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
  const arrMan = century 
    ? people.filter(e => {
      return Math.ceil(e.died / 100) === century && e.sex === 'm';
    }) 
    : people.filter(e => e.sex === 'm');

  const sumAgePeople = arrMan.reduce((acc, curr) => {
    const age = curr.died - curr.born;

    return acc + age;
  }, 0);

  const numPeople = arrMan.length;

  return sumAgePeople / numPeople;
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
  const arrWoman = people.filter(e => e.sex === 'f');
  const arrNameMother = people.map(e => e.mother);
  const arrWomenMother = arrWoman.filter(e => {
    return arrNameMother.includes(e.name);
  })

  const arrWomanForAge = withChildren ? arrWomenMother : arrWoman;
  const sumAgeWoman = arrWomanForAge.reduce((acc, curr) => {
    const age = curr.died - curr.born;

    return acc + age;
  }, 0);
  const numWoman = arrWomanForAge.length;

  return sumAgeWoman / numWoman;
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
  const mothers = people.filter(({ mother, sex }) => {
    return onlyWithSon
    ? sex === 'm' && people.find((person) => person.name === mother)
    : people.find((person) => person.name === mother)
  });

  const ages = mothers.reduce((acc, { mother, born: ageChild }) => {
    const { born: ageMom } = people.find(({ name }) => {
      return name === mother;
    });
    const diff = ageChild - ageMom;
    
    return acc + diff;
  }, 0);

  return ages / mothers.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
