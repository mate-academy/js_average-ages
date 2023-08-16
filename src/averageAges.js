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
  if (century !== undefined) {
    const currentPeople = people.filter((man) => man.sex === 'm'
    && Math.ceil(man.died / 100) === century);
    const peopleAge = currentPeople.map((man) => man.died - man.born);
    const sumAge = peopleAge.reduce((acc, current) => acc + current);

    return sumAge / peopleAge.length;
  } else {
    const currentPeople = people.filter((man) => man.sex === 'm');
    const peopleAge = currentPeople.map((man) => man.died - man.born);
    const sumAge = peopleAge.reduce((acc, current) => acc + current);

    return sumAge / peopleAge.length;
  }
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
  if (withChildren !== undefined) {
    const mothers = people.filter(person =>
      people.some(p => p.mother === person.name) && person.sex === 'f'
    );
    const womensAge = mothers.map((women) => women.died - women.born);
    const sumAge = womensAge.reduce((acc, current) => acc + current);

    return sumAge / womensAge.length;
  } else {
    const mothers = people.filter(person => person.sex === 'f');
    const womensAge = mothers.map((women) => women.died - women.born);
    const sumAge = womensAge.reduce((acc, current) => acc + current);

    return sumAge / womensAge.length;
  }
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
  if (onlyWithSon !== undefined) {
    const mothers = people.filter(person =>
      people.some(p => person.mother === p.name) && person.sex === 'm'
    );
    const mothersAndChildDiff = mothers.map(child => {
      const mother = people.find(person => person.name === child.mother);

      if (mother) {
        return child.born - mother.born;
      }
    });
    const sumAge = mothersAndChildDiff.reduce((acc, current) => acc + current);

    return sumAge / mothersAndChildDiff.length;
  } else {
    const mothers = people.filter(person =>
      people.some(p => person.mother === p.name)
    );
    const mothersAndChildDiff = mothers.map(child => {
      const mother = people.find(person => person.name === child.mother);

      if (mother) {
        return child.born - mother.born;
      }
    });
    const sumAge = mothersAndChildDiff.reduce((acc, current) => acc + current);

    return sumAge / mothersAndChildDiff.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
