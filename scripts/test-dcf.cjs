// Test for public/dcf.js (no dependencies): `npm run test:dcf`.
// Expected values are worked out independently below (closed-form sums), not copied from the code.
// The script is a classic browser script (package.json is type: module), so it is run the way the page runs it.
const fs = require('fs'), path = require('path'), vm = require('vm');
const win = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'public', 'dcf.js'), 'utf8'), { window: win });
const { dcf } = win.DVCalc;

let failed = 0;
const close = (name, got, want, tol = 1e-6) => {
  const ok = typeof got === 'number' && Math.abs(got - want) <= tol * Math.max(1, Math.abs(want));
  console.log((ok ? 'PASS ' : 'FAIL ') + name + ': ' + got + (ok ? '' : ' (want ' + want + ')'));
  if (!ok) failed++;
};
const same = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log((ok ? 'PASS ' : 'FAIL ') + name + ': ' + JSON.stringify(got) + (ok ? '' : ' (want ' + JSON.stringify(want) + ')'));
  if (!ok) failed++;
};

// 1. One year, no growth: FCF 100, r 10%, gT 0.
//    PV1 = 100/1.1 = 90.909091; TV = 100/0.10 = 1000; PV(TV) = 1000/1.1 = 909.090909; total = 1000 (a flat perpetuity of 100 at 10%).
let r = dcf({ fcf: 100, growth: 0, years: 1, terminalGrowth: 0, discount: 0.1, shares: 10 });
close('flat perpetuity: stage 1', r.pvStage1, 90.9090909091);
close('flat perpetuity: terminal value', r.terminalValue, 1000);
close('flat perpetuity: PV of terminal', r.pvTerminal, 909.0909090909);
close('flat perpetuity: equity = FCF / r', r.equityValue, 1000);
close('flat perpetuity: per share', r.perShare, 100);
same('no price -> no margin of safety', r.marginOfSafety, null);

// 2. A flat perpetuity is worth FCF / r however many explicit years are used.
r = dcf({ fcf: 100, growth: 0, years: 25, terminalGrowth: 0, discount: 0.08, shares: 1 });
close('flat perpetuity over 25 years', r.equityValue, 1250);

// 3. Growth equal in both stages collapses to the Gordon formula: FCF0 * (1+g) / (r - g).
r = dcf({ fcf: 200, growth: 0.03, years: 10, terminalGrowth: 0.03, discount: 0.09, shares: 1 });
close('single growth rate = Gordon growth', r.equityValue, 200 * 1.03 / (0.09 - 0.03));

// 4. The page's default example, by the geometric-series closed form.
//    q = 1.08/1.10; PV1 = 1000 * q * (1 - q^10) / (1 - q); TV = 1000 * 1.08^10 * 1.025 / 0.075; PV(TV) = TV / 1.1^10.
const q = 1.08 / 1.1;
const pv1 = 1000 * q * (1 - Math.pow(q, 10)) / (1 - q);
const tv = 1000 * Math.pow(1.08, 10) * 1.025 / 0.075;
const pvTv = tv / Math.pow(1.1, 10);
r = dcf({ fcf: 1000, growth: 0.08, years: 10, terminalGrowth: 0.025, discount: 0.1, netCash: 500, shares: 500, price: 30 });
close('default example: stage 1', r.pvStage1, pv1);
close('default example: terminal value', r.terminalValue, tv);
close('default example: PV of terminal', r.pvTerminal, pvTv);
close('default example: net cash is added', r.equityValue, pv1 + pvTv + 500);
close('default example: per share', r.perShare, (pv1 + pvTv + 500) / 500);
close('default example: terminal share of value', r.terminalShare, pvTv / (pv1 + pvTv));
close('default example: margin of safety', r.marginOfSafety, 1 - 30 / ((pv1 + pvTv + 500) / 500));
same('default example: one row per year', r.rows.length, 10);
close('default example: year 3 cash flow', r.rows[2].fcf, 1000 * 1.08 ** 3);
close('default example: year 3 discount factor', r.rows[2].factor, 1 / 1.1 ** 3);
close('rows add up to stage 1', r.rows.reduce((s, x) => s + x.pv, 0), pv1);

// 5. Price above the estimate gives a negative margin of safety; net debt lowers the value.
r = dcf({ fcf: 100, growth: 0, years: 1, terminalGrowth: 0, discount: 0.1, netCash: -200, shares: 10, price: 100 });
close('net debt is subtracted', r.perShare, 80);
close('price above value -> negative margin', r.marginOfSafety, (80 - 100) / 80);

// 6. Refusals: never a number when the model has none.
same('discount = terminal growth', dcf({ fcf: 100, growth: 0.05, years: 5, terminalGrowth: 0.1, discount: 0.1, shares: 1 }), { ok: false, error: 'rates' });
same('discount < terminal growth', dcf({ fcf: 100, growth: 0.05, years: 5, terminalGrowth: 0.04, discount: 0.03, shares: 1 }), { ok: false, error: 'rates' });
same('zero shares', dcf({ fcf: 100, growth: 0.05, years: 5, terminalGrowth: 0.02, discount: 0.1, shares: 0 }), { ok: false, error: 'input' });
same('negative cash flow', dcf({ fcf: -5, growth: 0.05, years: 5, terminalGrowth: 0.02, discount: 0.1, shares: 1 }), { ok: false, error: 'input' });
same('NaN input', dcf({ fcf: NaN, growth: 0.05, years: 5, terminalGrowth: 0.02, discount: 0.1, shares: 1 }), { ok: false, error: 'input' });
same('fractional years', dcf({ fcf: 100, growth: 0.05, years: 2.5, terminalGrowth: 0.02, discount: 0.1, shares: 1 }), { ok: false, error: 'input' });
same('too many years', dcf({ fcf: 100, growth: 0.05, years: 31, terminalGrowth: 0.02, discount: 0.1, shares: 1 }), { ok: false, error: 'input' });
r = dcf({ fcf: 100, growth: 0, years: 1, terminalGrowth: 0, discount: 0.1, netCash: -5000, shares: 10, price: 5 });
same('negative equity value -> no margin of safety', r.marginOfSafety, null);

console.log(failed ? failed + ' FAILED' : 'all DCF checks passed');
if (failed) process.exitCode = 1;
