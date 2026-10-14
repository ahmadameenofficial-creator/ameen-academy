export const countryCodes = ('AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW').split(' ');
export type ProfileGender = 'male' | 'female' | 'unspecified';
export interface ProfileDetails {
  age: number | null;
  country: string | null;
  gender: ProfileGender | null;
  consent: boolean;
}
export interface AccountProfile extends ProfileDetails { email: string | null }
export function parseProfile(value: unknown): ProfileDetails | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  if (typeof data.consent !== 'boolean') return null;
  if (!data.consent) return { age: null, country: null, gender: null, consent: false };
  const age = data.age === null || data.age === '' || data.age === undefined ? null : data.age;
  const country = data.country === null || data.country === '' || data.country === undefined ? null : data.country;
  const gender = data.gender === null || data.gender === '' || data.gender === undefined ? null : data.gender;
  if (age !== null && (typeof age !== 'number' || !Number.isInteger(age) || age < 1 || age > 120)) return null;
  if (country !== null && (typeof country !== 'string' || !countryCodes.includes(country))) return null;
  if (gender !== null && gender !== 'male' && gender !== 'female' && gender !== 'unspecified') return null;
  return { age, country, gender, consent: true } as ProfileDetails;
}
export function verifiedAccountEmail(value: unknown) {
  return typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : null;
}
