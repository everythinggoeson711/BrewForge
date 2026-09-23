import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { recordCertificationResult } from '../features/certification/certificationSlice';
import type { CertificationExam } from '../features/certification/certificationSlice';
import { QuizRunner } from '../components/training/QuizRunner';
import { CertificateModal } from '../components/training/CertificateModal';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export const CertificationsPage = () => {
  const dispatch = useAppDispatch();
  const exams = useAppSelector((state) => state.certification.exams);
  const history = useAppSelector((state) => state.certification.history);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const [activeExam, setActiveExam] = useState<CertificationExam | null>(null);
  const [certificate, setCertificate] = useState<{ gate: string; examTitle: string; date: string } | null>(null);

  const examGridRef = useStaggerReveal<HTMLDivElement>('.gate-card');
  const tableRef = useStaggerReveal<HTMLTableSectionElement>('.data-table__row');

  const handleComplete = (score: number, total: number) => {
    if (!activeExam) return;
    const percent = Math.round((score / total) * 100);
    const status: 'passed' | 'failed' = percent >= 70 ? 'passed' : 'failed';
    const date = new Date().toISOString().slice(0, 10);

    dispatch(
      recordCertificationResult({
        examId: activeExam.id,
        examTitle: activeExam.title,
        gate: activeExam.gate,
        score,
        total,
        percent,
        status,
        date,
      }),
    );

    if (status === 'passed') {
      setCertificate({ gate: activeExam.gate, examTitle: activeExam.title, date });
    }
  };

  if (activeExam) {
    return (
      <div className="certifications">
        <button type="button" className="lesson__back" onClick={() => setActiveExam(null)}>
          &larr; Back to Certification Gates
        </button>
        <h1 className="page-heading">{activeExam.gate}</h1>
        <QuizRunner
          title={activeExam.title}
          questions={activeExam.questions}
          durationSeconds={activeExam.durationMinutes * 60}
          onComplete={handleComplete}
        />
        {certificate && (
          <CertificateModal
            recipientName={currentUser?.name ?? 'BrewForge Trainee'}
            gate={certificate.gate}
            examTitle={certificate.examTitle}
            date={certificate.date}
            onClose={() => setCertificate(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="certifications">
      <h1 className="page-heading">Certifications</h1>

      <div className="gate-grid" ref={examGridRef}>
        {exams.map((exam) => (
          <div className="gate-card" key={exam.id}>
            <span className="gate-card__gate">{exam.gate}</span>
            <h2 className="gate-card__title">{exam.title}</h2>
            <div className="gate-card__meta">
              <span>{exam.durationMinutes} min</span>
              <span>{exam.questions.length} questions</span>
            </div>
            <button type="button" className="btn btn--outline" onClick={() => setActiveExam(exam)}>
              Start Certification
            </button>
          </div>
        ))}
      </div>

      <h2 className="section-heading section-heading--tight">Certification History</h2>
      <div className="table-panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Gate</th>
              <th>Exam</th>
              <th>Score</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody ref={tableRef}>
            {history.map((record) => (
              <tr className="data-table__row" key={record.id}>
                <td>{record.gate}</td>
                <td>{record.examTitle}</td>
                <td>{record.percent}%</td>
                <td>
                  <span className={`badge badge--${record.status === 'passed' ? 'published' : 'draft'}`}>
                    {record.status === 'passed' ? 'Passed' : 'Failed'}
                  </span>
                </td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
