// Two-stage discounted cash flow, used by /intrinsic-value-calculator/ (and tested by scripts/test-dcf.cjs).
//
//   FCF_t        = FCF_0 * (1 + g)^t                     for t = 1..N
//   PV(stage 1)  = sum over t of FCF_t / (1 + r)^t
//   TV           = FCF_N * (1 + gT) / (r - gT)           (Gordon growth; needs r > gT)
//   PV(TV)       = TV / (1 + r)^N
//   Equity value = PV(stage 1) + PV(TV) + net cash       (net cash = cash - debt)
//   Per share    = Equity value / shares
//   Margin of safety = (per share - price) / per share   (only when a price is given and per share > 0)
//
// Rates are decimals (0.10 = 10%). Money inputs share one unit (the page uses millions) and shares use
// the same scale, so the per-share value comes out in plain currency.
(function (root) {
  'use strict';

  var MAX_YEARS = 30;

  function isNum(x) { return typeof x === 'number' && isFinite(x); }

  /**
   * @param {{ fcf: number, growth: number, years: number, terminalGrowth: number, discount: number,
   *           netCash?: number, shares: number, price?: number | null }} input
   * @returns {{ ok: true, rows: Array<{ year: number, fcf: number, factor: number, pv: number }>,
   *             pvStage1: number, terminalValue: number, pvTerminal: number, enterpriseValue: number,
   *             equityValue: number, perShare: number, terminalShare: number, marginOfSafety: number | null }
   *          | { ok: false, error: 'input' | 'rates' }}
   */
  function dcf(input) {
    var fcf = input.fcf, g = input.growth, n = input.years, gT = input.terminalGrowth, r = input.discount;
    var netCash = input.netCash == null ? 0 : input.netCash;
    var shares = input.shares, price = input.price;

    if (!isNum(fcf) || !isNum(g) || !isNum(n) || !isNum(gT) || !isNum(r) || !isNum(netCash) || !isNum(shares)) return { ok: false, error: 'input' };
    if (fcf <= 0 || shares <= 0 || n < 1 || n > MAX_YEARS || Math.floor(n) !== n || g <= -1 || r <= -1) return { ok: false, error: 'input' };
    // The terminal value divides by (r - gT): at or below zero the perpetuity has no finite value.
    if (r <= gT) return { ok: false, error: 'rates' };

    var rows = [], pvStage1 = 0, cash = fcf, factor = 1;
    for (var t = 1; t <= n; t++) {
      cash = cash * (1 + g);
      factor = factor / (1 + r);
      var pv = cash * factor;
      pvStage1 += pv;
      rows.push({ year: t, fcf: cash, factor: factor, pv: pv });
    }
    var terminalValue = cash * (1 + gT) / (r - gT);
    var pvTerminal = terminalValue * factor;
    var enterpriseValue = pvStage1 + pvTerminal;
    var equityValue = enterpriseValue + netCash;
    var perShare = equityValue / shares;
    var hasPrice = isNum(price) && price > 0;

    return {
      ok: true,
      rows: rows,
      pvStage1: pvStage1,
      terminalValue: terminalValue,
      pvTerminal: pvTerminal,
      enterpriseValue: enterpriseValue,
      equityValue: equityValue,
      perShare: perShare,
      terminalShare: pvTerminal / enterpriseValue,
      marginOfSafety: hasPrice && perShare > 0 ? (perShare - price) / perShare : null,
    };
  }

  root.DVCalc = { dcf: dcf, MAX_YEARS: MAX_YEARS };
})(window);
