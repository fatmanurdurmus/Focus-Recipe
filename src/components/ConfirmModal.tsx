type Props = {
  title: string;
  message: string;
  isOpen: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({
  title,
  message,
  isOpen,
  confirmText = "Sil",
  cancelText = "Vazgeç",
  onConfirm,
  onClose,
}: Props) {
  // Basit yaklaşım: isOpen false ise hiç render etmiyoruz
  if (!isOpen) return null;

  return (
    <>
      {/* Arka plan karartma */}
      <div className="modal-backdrop fade show" />

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              <p className="mb-0 text-muted">{message}</p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                {cancelText}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
