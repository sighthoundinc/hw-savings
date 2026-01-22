(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  if (typeof root !== 'undefined') {
    root.SighthoundPdf = factory();
  }
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  function getCore() {
    if (typeof window !== 'undefined' && window.SighthoundCalcCore) {
      return window.SighthoundCalcCore;
    }
    try {
      // eslint-disable-next-line global-require, import/no-unresolved
      return require('./calc-core');
    } catch (e) {
      return null;
    }
  }

  function renderPdfFromParams(params, targetEl) {
    var CalcCore = getCore();
    if (!CalcCore || !targetEl) return;

    var result = CalcCore.computeScenarioResults(params || {});
    var hardware = result.hardware;
    var software = result.software;
    var breakdown = result.breakdown;

    var formatCurrency = CalcCore.formatCurrency;
    var formatPercent = CalcCore.formatPercent;

    function setText(id, value) {
      var el = targetEl.querySelector('#' + id);
      if (el) {
        el.textContent = value;
      }
    }

    // Header / meta
    setText('pdfTitle', 'Hardware savings estimate');

    // Scenario / inputs snapshot
    var scenarioLabel;
    if (result.scenario === 'a') {
      scenarioLabel = 'Scenario A: smart cameras today';
    } else if (result.scenario === 'b') {
      scenarioLabel = 'Scenario B: existing standard IP cameras';
    } else {
      scenarioLabel = 'Scenario C: new deployment';
    }
    setText('pdfScenario', scenarioLabel);

    setText('pdfCameras', (result.cameras || 0).toLocaleString('en-US'));

    var smartCost = params && typeof params.smartCost === 'number' ? params.smartCost : 3000;
    var ipCost = params && typeof params.ipCost === 'number' ? params.ipCost : 250;

    setText('pdfSmartCost', formatCurrency(smartCost));
    setText('pdfIpCost', formatCurrency(ipCost));

    // Software selection label
    var softwareLabel;
    var sel = (software && software.selection) || (params && params.software) || 'both';
    sel = String(sel || 'both').toLowerCase();
    if (sel === 'none') softwareLabel = 'None';
    else if (sel === 'lpr') softwareLabel = 'LPR only';
    else if (sel === 'mmcg') softwareLabel = 'MMCG only';
    else softwareLabel = 'LPR + MMCG (bundle)';
    setText('pdfSoftwareSelection', softwareLabel);

    var billing = (software && software.billing) || (params && params.billing) || 'monthly';
    billing = String(billing || 'monthly').toLowerCase() === 'yearly' ? 'Yearly' : 'Monthly';
    setText('pdfBilling', billing);

    // Hardware summary
    setText('pdfTodayLabel', hardware.labels && hardware.labels.todayLabel ? hardware.labels.todayLabel : 'Today');
    setText('pdfSighthoundLabel', hardware.labels && hardware.labels.sighthoundLabel ? hardware.labels.sighthoundLabel : 'With Sighthound');

    setText('pdfTodayTotal', formatCurrency(hardware.todayTotal));
    setText('pdfSighthoundTotal', formatCurrency(hardware.sighthoundTotal));

    // Savings card (Scenario A only)
    var savingsSection = targetEl.querySelector('#pdfSavingsSection');
    if (result.scenario === 'a') {
      if (savingsSection) {
        savingsSection.style.display = '';
      }
      var primaryLabel = hardware.labels && hardware.labels.primaryLabel
        ? hardware.labels.primaryLabel
        : (hardware.savings >= 0 ? 'Savings vs today' : 'Extra cost vs today');
      setText('pdfSavingsLabel', primaryLabel);
      setText('pdfSavingsValue', formatCurrency(Math.abs(hardware.savings)));
      setText('pdfPercentReduction', formatPercent(hardware.percentReduction));
    } else if (savingsSection) {
      savingsSection.style.display = 'none';
    }

    // Nodes and cost per camera
    setText('pdfNodes', String(result.nodesNeeded));
    setText('pdfCostPerCameraBefore', formatCurrency(hardware.costPerCameraBefore));
    setText('pdfCostPerCameraAfter', formatCurrency(hardware.costPerCameraAfter));

    // Software totals
    setText('pdfSoftwareMonthly', formatCurrency(software.monthlyTotal));
    setText('pdfSoftwareYearly', formatCurrency(software.yearlyTotal));

    // Breakdown lines
    setText('pdfTodayBreakdown', breakdown.todayLine || '');
    setText('pdfNodesBreakdown', breakdown.nodesLine || '');
    setText('pdfCamerasBreakdown', breakdown.camerasLine || '');
    setText('pdfSoftwareBreakdown', breakdown.softwareLine || '');
  }

  function prepareAndPrintPdf(state) {
    if (!state || typeof state.getParams !== 'function') return;
    var params = state.getParams();

    // Ensure breakdown preference is on for canonical URL state
    if (!params.expandBreakdown) {
      state.update({ expandBreakdown: 1 });
      params = state.getParams();
    }

    var root = (typeof document !== 'undefined') && document.getElementById('pdfRoot');
    if (!root) return;

    renderPdfFromParams(params, root);
    window.print();
  }

  return {
    renderPdfFromParams: renderPdfFromParams,
    prepareAndPrintPdf: prepareAndPrintPdf,
  };
});
