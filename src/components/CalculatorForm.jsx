import { useState } from 'react';
import { STATES } from '../data/states.js';
import { SlidersHorizontal, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const PRESET_SALARIES = [50000, 75000, 100000, 150000];

export default function CalculatorForm({
  values,
  onChange,
  onSubmit,
  error,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSalaryPreset = (amount) => {
    onChange('grossSalary', amount);
  };

  const handleSalaryInput = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    onChange('grossSalary', raw === '' ? '' : Number(raw));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8"
      aria-label="Salary Calculator Form"
    >
      <div className="space-y-6">
        {/* Gross Salary Input */}
        <div>
          <label htmlFor="grossSalary" className="block text-sm font-bold text-slate-900 mb-1">
            Annual Gross Salary ($)
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-semibold text-lg">
              $
            </div>
            <input
              type="text"
              id="grossSalary"
              name="grossSalary"
              inputMode="numeric"
              placeholder="75,000"
              value={values.grossSalary !== '' && values.grossSalary !== undefined ? Number(values.grossSalary).toLocaleString('en-US') : ''}
              onChange={handleSalaryInput}
              className={`block w-full pl-8 pr-4 py-3.5 text-xl font-bold text-slate-900 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                error ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-300 hover:border-slate-400'
              }`}
              aria-describedby={error ? 'salary-error' : undefined}
            />
          </div>

          {error && (
            <p id="salary-error" className="mt-2 text-xs text-red-600 flex items-center gap-1 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}

          {/* Quick preset buttons */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Quick select:</span>
            {PRESET_SALARIES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleSalaryPreset(preset)}
                className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-all ${
                  Number(values.grossSalary) === preset
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                ${preset / 1000}k
              </button>
            ))}
          </div>
        </div>

        {/* State Selection */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="stateSelect" className="block text-sm font-bold text-slate-900">
              State
            </label>
            <span className="text-xs text-slate-500">
              Includes all 50 states + DC
            </span>
          </div>
          <div className="relative">
            <select
              id="stateSelect"
              name="state"
              value={values.stateId}
              onChange={(e) => onChange('stateId', e.target.value)}
              className="block w-full py-3 px-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-colors"
            >
              {STATES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} {s.type === 'no_income_tax' ? '(0% State Tax)' : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Grid: Filing Status & Pay Frequency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="filingStatus" className="block text-sm font-bold text-slate-900 mb-1">
              Filing Status
            </label>
            <div className="relative">
              <select
                id="filingStatus"
                name="filingStatus"
                value={values.filingStatus}
                onChange={(e) => onChange('filingStatus', e.target.value)}
                className="block w-full py-3 px-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-colors"
              >
                <option value="single">Single</option>
                <option value="married_jointly">Married Filing Jointly</option>
                <option value="married_separately">Married Filing Separately</option>
                <option value="head_of_household">Head of Household</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="payFrequency" className="block text-sm font-bold text-slate-900 mb-1">
              Pay Frequency
            </label>
            <div className="relative">
              <select
                id="payFrequency"
                name="payFrequency"
                value={values.payFrequency}
                onChange={(e) => onChange('payFrequency', e.target.value)}
                className="block w-full py-3 px-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-colors"
              >
                <option value="monthly">Monthly (12 paychecks/yr)</option>
                <option value="biweekly">Biweekly (26 paychecks/yr)</option>
                <option value="semimonthly">Semimonthly (24 paychecks/yr)</option>
                <option value="weekly">Weekly (52 paychecks/yr)</option>
                <option value="annual">Annual (1 total)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Pre-Tax Deductions Section */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full py-2 text-left text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Pre-Tax Deductions (401k, Health, HSA)</span>
            </div>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <span>Customize</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            )}
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in-50 duration-150">
              {/* 401(k) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="k401Value" className="text-xs font-bold text-slate-800">
                    401(k) Contribution
                  </label>
                  <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => onChange('k401Type', 'percent')}
                      className={`px-2 py-0.5 rounded font-semibold ${
                        values.k401Type === 'percent'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      %
                    </button>
                    <button
                      type="button"
                      onClick={() => onChange('k401Type', 'dollar')}
                      className={`px-2 py-0.5 rounded font-semibold ${
                        values.k401Type === 'dollar'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      $
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    id="k401Value"
                    name="k401Value"
                    min="0"
                    max={values.k401Type === 'percent' ? 100 : 23500}
                    value={values.k401Value}
                    onChange={(e) => onChange('k401Value', Math.max(0, Number(e.target.value)))}
                    className="block w-full px-3 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={values.k401Type === 'percent' ? 'e.g. 5%' : 'e.g. 5000'}
                  />
                  <span className="absolute right-3 inset-y-0 flex items-center text-xs text-slate-400 font-mono">
                    {values.k401Type === 'percent' ? '% of salary' : 'per year'}
                  </span>
                </div>
              </div>

              {/* Health Insurance */}
              <div>
                <label htmlFor="healthInsuranceMonthly" className="block text-xs font-bold text-slate-800 mb-1">
                  Health Insurance Premium (Monthly)
                </label>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-xs text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    id="healthInsuranceMonthly"
                    name="healthInsuranceMonthly"
                    min="0"
                    value={values.healthInsuranceMonthly}
                    onChange={(e) => onChange('healthInsuranceMonthly', Math.max(0, Number(e.target.value)))}
                    className="block w-full pl-7 pr-16 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                  />
                  <span className="absolute right-3 inset-y-0 flex items-center text-xs text-slate-400 font-mono">
                    / month
                  </span>
                </div>
              </div>

              {/* HSA */}
              <div>
                <label htmlFor="hsaAnnual" className="block text-xs font-bold text-slate-800 mb-1">
                  HSA Contribution (Annual)
                </label>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-xs text-slate-400 font-semibold">$</span>
                  <input
                    type="number"
                    id="hsaAnnual"
                    name="hsaAnnual"
                    min="0"
                    max="8550"
                    value={values.hsaAnnual}
                    onChange={(e) => onChange('hsaAnnual', Math.max(0, Number(e.target.value)))}
                    className="block w-full pl-7 pr-16 py-2 text-sm font-medium bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                  />
                  <span className="absolute right-3 inset-y-0 flex items-center text-xs text-slate-400 font-mono">
                    / year
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/30 active:scale-[0.99] cursor-pointer"
        >
          Calculate Take-Home Pay
        </button>
      </div>
    </form>
  );
}
