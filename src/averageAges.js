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
  let male;

  if (century !== undefined) {
    male = people.filter(person => {
      if (
        person.sex === 'm' && Math.ceil(person.died / 100) === century
      ) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    male = people.filter(person => person.sex === 'm');
  }

  const age = male.reduce((sum, cur) => sum + (cur.died - cur.born), 0);

  return age / male.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let female;

  if (withChildren !== undefined) {
    female = people.filter(person => {
      if (
        person.sex === 'f' && people.some(man => man.mother === person.name)
      ) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    female = people.filter(person => person.sex === 'f');
  }

  const age = female.reduce((sum, cur) => sum + (cur.died - cur.born), 0);

  return age / female.length;
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
  let female;
  const ageGap = [];

  if (onlyWithSon !== undefined) {
    female = people.filter(person => {
      if (
        person.sex === 'f' && people.some(man => {
          return man.mother === person.name && man.sex === 'm';
        })
      ) {
        return true;
      } else {
        return false;
      }
    });

    female.map(mother => {
      const children = people.filter(man => {
        return man.mother === mother.name;
      });

      children.map(child => {
        if (child.sex === 'm') {
          ageGap.push(child.born - mother.born);
        }
      });
    });
  } else {
    female = people.filter(person => {
      if (
        person.sex === 'f' && people.some(man => man.mother === person.name)
      ) {
        return true;
      } else {
        return false;
      }
    });

    female.map(mother => {
      const children = people.filter(man => {
        return man.mother === mother.name;
      });

      children.map(child => {
        ageGap.push(child.born - mother.born);
      });
    });
  };

  return (ageGap.reduce((sum, age) => sum + age)) / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
