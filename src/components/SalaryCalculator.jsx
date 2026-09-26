import { useState, useMemo, useEffect } from 'react';
import CalculatorForm from './CalculatorForm.jsx';
import ResultsDashboard from './ResultsDashboard.jsx';
import { calculateTakeHomePay } from '../calculations/salaryCalculator.js';

export default function SalaryCalculator({
  initialSalary = 75000,
  initialStateId = 'TX',
  initialFilingStatus = 'single',
  initialFrequency = 'monthly',
  onCalculationChange = null,
}) {
  const [values, setValues] = useState({
    grossSalary: initialSalary,
    stateId: initialStateId,
    filingStatus: initialFilingStatus,
    payFrequency: initialFrequency,
    k401Value: 0,
    k401Type: 'percent',
    healthInsuranceMonthly: 0,
    hsaAnnual: 0,
  });

  const [error, setError] = useState('');

  // Synchronize when initial props change (e.g. user navigates between state pages)
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      grossSalary: initialSalary !== undefined ? initialSalary : prev.grossSalary,
      stateId: initialStateId || prev.stateId,
      filingStatus: initialFilingStatus || prev.filingStatus,
      payFrequency: initialFrequency || prev.payFrequency,
    }));
  }, [initialSalary, initialStateId, initialFilingStatus, initialFrequency]);

  const handleChange = (field, val) => {
    setValues((prev) => {
      const next = { ...prev, [field]: val };
      if (field === 'grossSalary') {
        if (val === '' || isNaN(Number(val))) {
          setError('Please enter a valid salary amount.');
        } else if (Number(val) < 0) {
          setError('Salary cannot be negative.');
        } else {
          setError('');
        }
      }
      return next;
    });
  };

  const calculation = useMemo(() => {
    const safeSalary = Number(values.grossSalary) || 0;
    const res = calculateTakeHomePay({
      ...values,
      grossSalary: safeSalary,
    });
    if (onCalculationChange) {
      onCalculationChange(res);
    }
    return res;
  }, [values, onCalculationChange]);

  const handleFrequencyChange = (newFreq) => {
    handleChange('payFrequency', newFreq);
  };

  const handleFormSubmit = () => {
    if (values.grossSalary === '' || Number(values.grossSalary) <= 0) {
      setError('Please enter a positive annual salary.');
      return;
    }
    setError('');
    const resultsEl = document.getElementById('results-dashboard');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="w-full space-y-8" id="calculator-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 w-full">
          <CalculatorForm
            values={values}
            onChange={handleChange}
            onSubmit={handleFormSubmit}
            error={error}
          />
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 w-full">
          <ResultsDashboard
            calculation={calculation}
            onFrequencyChange={handleFrequencyChange}
          />
        </div>
      </div>
    </div>
  );
}
