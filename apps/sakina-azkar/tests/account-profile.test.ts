import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProfile, verifiedAccountEmail } from '../src/lib/account-profile';
test('demographics require explicit consent and can be removed without closing the account', () => {
  assert.deepEqual(parseProfile({ consent: true, age: 27, country: 'EG', gender: 'male' }), { consent: true, age: 27, country: 'EG', gender: 'male' });
  assert.deepEqual(parseProfile({ consent: false, age: 27, country: 'EG', gender: 'male' }), { consent: false, age: null, country: null, gender: null });
  assert.deepEqual(parseProfile({ consent: true, age: '', country: '', gender: '' }), { consent: true, age: null, country: null, gender: null });
  assert.equal(parseProfile({ age: 27, country: 'EG', gender: 'male' }), null);
});
test('profile inputs reject impossible ages, unsupported countries and arbitrary gender values', () => {
  for (const age of [-1, 0, 121, 27.5, '27', NaN]) assert.equal(parseProfile({ consent: true, age }), null);
  assert.equal(parseProfile({ consent: true, age: 27, country: 'ZZ' }), null);
  assert.equal(parseProfile({ consent: true, age: 27, country: 'eg' }), null);
  assert.equal(parseProfile({ consent: true, gender: '<script>' }), null);
  assert.equal(verifiedAccountEmail('reader@example.test'), 'reader@example.test');
  assert.equal(verifiedAccountEmail('unverified string'), null);
});
