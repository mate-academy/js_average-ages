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
  // replace if () statement with &&, || or ?:
  // without nesting
  const male = people.filter(item => {
    let isMan = null;

    (century) ? isMan = !!((item.sex === 'm'
      & Math.ceil(item.died / 100) === century))
      : isMan = item.sex === 'm';

    return isMan;
  });

  const mensAge = male.map(men => men.died - men.born);

  const avMensAge = mensAge.reduce((prev, item) => {
    return prev + item;
  }) / male.length;

  return avMensAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  // if (withChildren) {
  //   let mothers = people.map(person => person.mother);

  //   mothers = mothers.filter(person => person !== null);

  //   const female = people.filter(item => mothers.includes(item.name));
  //   const womanAge = female.map(woman => woman.died - woman.born);
  //   const avWomenAge = womanAge.reduce((prev, item) => {
  //     return (prev + item);
  //   }) / female.length;

  //   return avWomenAge;
  // };

  // if (!withChildren) {
  //   const female = people.filter(item => item.sex === 'f');
  //   const womanAge = female.map(woman => woman.died - woman.born);
  //   const avWomenAge = womanAge.reduce((prev, item) => {
  //     return (prev + item);
  //   }) / female.length;

  //   return avWomenAge;
  // }
  const mothers = people.map(person => person.mother);
  let female = null;
  let womanAge = null;
  let avWomenAge = null;

  withChildren ? (
    female = people.filter(item => mothers.includes(item.name))
  ) : (
    female = people.filter(item => item.sex === 'f')
  );
  womanAge = female.map(woman => woman.died - woman.born);

  avWomenAge = womanAge.reduce((prev, item) => {
    return (prev + item);
  }) / female.length;

  return avWomenAge;
};

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

  const allChildren = people.filter(person => {
    // if (people.find(mom => person.mother === mom.name)) {
    //   return person;
    // };
    const pers = people.find(mom => person.mother === mom.name)
    !== undefined;

    return pers;
  });
  const childrenBoys = allChildren.filter(child => child.sex === 'm');

  let mothers = people.map(person => person.mother);

  mothers = mothers.filter(person => person !== null);

  const finalMothers = people.filter(item => mothers.includes(item.name));

  const childrenFinal = onlyWithSon ? childrenBoys : allChildren;

  // if (onlyWithSon) {
  //   children = children.filter(child => child.sex === 'm');
  // }

  function findMomAge(child) {
    const mom = finalMothers.find(person => person.name === child.mother);
    const childBorn = child.born;
    const momBorn = mom.born;

    return childBorn - momBorn;
  };

  const ages = childrenFinal.map(findMomAge);

  return ages.reduce((a, b) => a + b, 0) / ages.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
