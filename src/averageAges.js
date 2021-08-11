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
  const men = people.filter(el => el.sex === 'm');

  const menAverageAge = men.reduce((a, b) =>
    a + (b.died - b.born), 0) / men.length;

  const menDiedThisCentury = men.filter(el =>
    Math.ceil(el.died / 100) === century);

  const menAgeThisCentury = menDiedThisCentury.reduce((a, b) =>
    a + (b.died - b.born), 0) / menDiedThisCentury.length;

  return century === undefined ? menAverageAge : menAgeThisCentury;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people.filter(el => el.sex === 'f');

  let womenAverageAge = women.reduce((a, b) =>
    a + (b.died - b.born), 0) / women.length;

  womenAverageAge = +womenAverageAge.toFixed(2);

  const womenWithChildren = women.filter((el, i, arr) =>
    people.filter(element => el.name === element.mother).length > 0);

  let womenAgeWithChildren = womenWithChildren.reduce((a, b) =>
    a + (b.died - b.born), 0) / womenWithChildren.length;

  womenAgeWithChildren = +womenAgeWithChildren.toFixed(2);

  return withChildren === undefined ? womenAverageAge : womenAgeWithChildren;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const women = people.filter(el => el.sex === 'f');

  let child = 0;
  let maleChild = 0;
  let countAgeDiff = 0;
  let countSonAgeDiff = 0;

  women.forEach(el =>
    people.forEach(element => {
      if (el.name === element.mother && element.sex === 'm') {
        countAgeDiff += element.born - el.born;
        countSonAgeDiff += element.born - el.born;
        child++;
        maleChild++;
      } else if (el.name === element.mother) {
        countAgeDiff += element.born - el.born;
        child++;
      }
    })
  );

  let agesDiffMomChild = countAgeDiff / child;
  let agesDiffMomSon = countSonAgeDiff / maleChild;

  agesDiffMomChild = +agesDiffMomChild.toFixed(2);
  agesDiffMomSon = +agesDiffMomSon.toFixed(2);

  return onlyWithSon === undefined ? agesDiffMomChild : agesDiffMomSon;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
