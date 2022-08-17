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

// const allPeople = require('./people');

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  // const arrWithMen = people.filter(person => person.sex === 'm');

  // const menAges = arrWithMen.map(age => age.died - age.born);

  // const menAverageAge = menAges.reduce((sumOfAges, currentAge) =>
  //   sumOfAges + currentAge, 0) / arrWithMen.length;
  // let diedInCentury = arrWithMen.map(age => Math.ceil(age.died / 100));

  // const filteredPeople = !century
  //   ? people.filter(person => person.sex === 'm')
  //   : people.filter(person => person.sex === 'm'
  //   && Math.ceil(person.died / 100) === century);

  // console.log(filteredPeople);
  // const averageAge = filteredPeople.reduce((sum, person) =>
  //   sum + (person.died - person.born), 0) / filteredPeople.length;
  // console.log(arrWithMen);
  // console.log(menAverageAge);
  // console.log(livingInCentury);
  //  console.log(diedInCentury);
  // console.log(averageAge);
  // return menAverageAgeInCentury
  // if (century === undefined) {
  //   return menAverageAge;
  // } else {

  // }
}

// console.log(calculateMenAverageAge(allPeople, 18));
// console.log(calculateMenAverageAge('./averageAges'));
// console.log(calculateMenAverageAge(people, 18));
// console.log(calculateMenAverageAge(people));
// console.log(calculateMenAverageAge(require('./averageAges')));

// expect(calculateMenAverageAge(people))
//     .toBeCloseTo(61.67, 2);
// });

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

// const allPeople = require('./people');
function calculateWomenAverageAge(people, withChildren) {
  // const arrWithWomen = people.filter(women => women.sex === 'f');
  // // console.log(arrWithWomen);
  // const womenAverageAge = arrWithWomen.map(age => age.died - age.born);
  // const womenAverageAgeWihtChildrenOnly = arrWithWomen
  //   .filter(women => women.mother)
  //   .map(age => age.died - age.born)
  //   .reduce((sumOfAges, currentAge) => sumOfAges + currentAge)
  //   / arrWithWomen.length;
  // console.log(womenAverageAgeWihtChildrenOnly);
  // // if (withChildren) {
  // //   return
  // // }
  // // console.log(womenAverageAge);
}

// console.log(calculateWomenAverageAge(allPeople, true));
// console.log(calculateWomenAverageAge(allPeople ));

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
  // write code here
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
