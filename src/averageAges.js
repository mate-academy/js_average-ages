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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const menOfCentury = century
    ? (people.filter((p) => p.sex === 'm'
        && Math.ceil(p.died / 100) === century))
    : (people.filter((p) => p.sex === 'm'));

  const arrMenAge = menOfCentury.map(man => man.died - man.born);
  const sumMenAge = arrMenAge.reduce((sum, age) => sum + age, 0);
  const averageAgeMen = sumMenAge / arrMenAge.length;

  return averageAgeMen;
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
  const mothersNames = people.map(person => person.mother);
  const women = withChildren
    ? (people.filter(per => mothersNames.some(woman => woman === per.name)))
    : (people.filter(per => per.sex === 'f'));
  const arrWomenAge = women.map(({ died, born }) => died - born);
  const sumAgeWomen = arrWomenAge.reduce((sum, age) => sum + age, 0);
  const averageAgeWomen = sumAgeWomen / arrWomenAge.length;

  return averageAgeWomen;
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
  const mothersNames = people.map(person => person.mother);
  const wAndMom = people.filter(per => mothersNames.some(w => w === per.name));

  const mothersChild = onlyWithSon
    ? (people.filter((child) => child.sex === 'm'
        && wAndMom.some(woman => woman.name === child.mother)))
    : (people.filter((ch) => wAndMom.some(w => w.name === ch.mother)));
  const difMoCh = mothersChild.map(person => {
    const mother = person.mother;
    const bornChild = person.born;
    const currentPersonsMother = people.find(woman => woman.name === mother);

    return bornChild - currentPersonsMother.born;
  });

  const sumAgeMoCh = difMoCh.reduce((sum, age) => sum + age, 0);
  const averageMoCh = sumAgeMoCh / difMoCh.length;

  return averageMoCh;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
