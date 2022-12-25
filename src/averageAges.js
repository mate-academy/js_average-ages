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
  const remembe = people.filter(person => person.sex === 'm');
  const onlyMen = century
    ? remembe.filter(w => Math.ceil(w.died / 100) === century)

    : remembe.filter(person => person.sex === 'm');

  const agelife = onlyMen.map(x => x.died - x.born);
  const midlAge = agelife.reduce((sum, x) => sum + x, 0);

  return midlAge / agelife.length;
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
  const womanWithChild = withChildren
    ? people.filter(allPeople => people
      .some(woman => woman.mother === allPeople.name))
    : people.filter(person => person.sex === 'f');
  const agelife = womanWithChild.map(x => x.died - x.born);
  const midlAge = agelife.reduce((sum, x) => sum + x, 0);

  return midlAge / agelife.length;
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
// function calculateAverageAgeDiff(people, onlyWithSon) {
//   const children = onlyWithSon
//   ? people.filter(person => people
//     .some(child => child.sex === 'm' && child.mother === person.name))
//   : people.filter(person => people
//     .some(child => child.name === person.mother));
// debugger
//   const result = people.map(person => {

//      children.some(children.mother === person.name)
//      person.born - children.born
//   });
//        return children
// }
// function calculateAverageAgeDiff(people, onlyWithSon) {
//   const children = onlyWithSon
//     ? people.filter(child => people
//       .some(person => child.sex === 'm' && person.name === child.mother))
//     : people.filter(child => people
//       .some(person => person.name === child.mother));

//   const onlyWomen = people.filter(peopl => peopl.sex === 'f');

//   const bob = [];

//   onlyWomen.map(person => {
//     children.some(child => {
//       child.mother === person.name
//         ? bob.push(child.born - person.born)
//         : false;
//     });
//   });

//   const numbers = bob.reduce((sum, a) => sum + a, 0);

//   return numbers / bob.length.toFixed(2);
// }

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = onlyWithSon
    ? people.filter(child => people
      .some(person => child.sex === 'm' && person.name === child.mother))
    : people.filter(child => people
      .some(person => person.name === child.mother));

  const diffAges = children.map(kid => {
    const mother = people.find(mom => mom.name === kid.mother);

    return kid.born - mother.born;
  });

  const numbers = diffAges.reduce((sum, a) => sum + a, 0);

  return numbers / diffAges.length.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
