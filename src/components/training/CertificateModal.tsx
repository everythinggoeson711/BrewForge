interface CertificateModalProps {
  recipientName: string;
  gate: string;
  examTitle: string;
  date: string;
  onClose: () => void;
}

export const CertificateModal = ({ recipientName, gate, examTitle, date, onClose }: CertificateModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="certificate-panel" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className="certificate">
          <p className="certificate__eyebrow">BrewForge &middot; Capability Gate Certificate</p>
          <h2 className="certificate__title">Certificate of Certification</h2>
          <p className="certificate__presented">This certifies that</p>
          <h3 className="certificate__name">{recipientName}</h3>
          <p className="certificate__body">
            has successfully passed the capability gate
            <br />
            <span className="certificate__gate">{gate}</span>
            <br />
            {examTitle}
          </p>
          <div className="certificate__footer">
            <span>Issued: {date}</span>
            <span>BrewForge Certification Board</span>
          </div>
        </div>

        <button type="button" className="btn btn--solid btn--full" onClick={() => window.print()}>
          Print Certificate
        </button>
      </div>
    </div>
  );
};
