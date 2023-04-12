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
  const men = people.filter(person => person.sex === 'm');

  const menAges = (century === undefined)
    ? men.map((person) => person.died - person.born)
    : men
      .filter(person => Math.ceil(person.died / 100) === century)
      .map(person => person.died - person.born);

  return (menAges.reduce((sum, age) => sum + age)) / menAges.length;
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
  const women = (withChildren)
    ? people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');
  const womenAges = women.map(person => person.died - person.born);

  return (womenAges.reduce((sum, age) => sum + age)) / womenAges.length;
}

// function calculateWomenAverageAge(people, withChildren) {
//   const women = people.filter(person => person.sex === 'f');
//   const mothers = people.map(person => person.mother);

//   const womenAges = (withChildren)
//     ? women
//       .filter(person => mothers.includes(person.name))
//       .map((person) => person.died - person.born)
//     : women.map((person) => person.died - person.born);

//   return (womenAges.reduce((sum, age) => sum + age)) / womenAges.length;
// }

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
  const childs = people.filter(child => child.mother
    && people.some(person => child.mother === person.name));

  const kids = (onlyWithSon)
    ? childs.filter(child => child.sex === 'm')
    : childs;

  const ages = kids.map(kid => {
    const mom = people.find(women => women.name === kid.mother);
    const age = kid.born - mom.born;

    return age;
  });

  return (ages.reduce((sum, age) => sum + age)) / ages.length;
}

// const womenNames = people
//   .filter(person => person.sex === 'f')
//   .map(person => person.name);

// const personWithMother = (onlyWithSon === undefined)
//   ? people.filter(person => womenNames.includes(person.mother))
//   : people
//     .filter(person => womenNames.includes(person.mother)
//       && person.sex === 'm');

// const ages = personWithMother.map(person => {
//   const nameMother = person.mother;
//   const mom = people.find(women => women.name === nameMother);
//   const age = person.born - mom.born;

//   return age;
// }
// );

// return (ages.reduce((sum, age) => sum + age)) / ages.length;

// function calculateAverageAgeDiff(people, onlyWithSon) {
//   const womenNames = people
//     .filter(person => person.sex === 'f')
//     .map(person => person.name);

//   const personWithMother = (onlyWithSon === undefined)
//     ? people.filter(person => womenNames.includes(person.mother))
//     : people
//       .filter(person => womenNames.includes(person.mother)
//         && person.sex === 'm');

//   const ages = personWithMother.map(person => {
//     const nameMother = person.mother;
//     const mom = people.find(women => women.name === nameMother);
//     const age = person.born - mom.born;

//     return age;
//   }
//   );

//   return (ages.reduce((sum, age) => sum + age)) / ages.length;
// }

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
