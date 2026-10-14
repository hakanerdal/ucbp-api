import { css } from "lit";

/** Coğrafi işlem formlarının ortak görünümü (portal panel ölçüleri). */
export const geoToolStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    color: #111827;
  }

  .panel { padding: 0; }

  .title {
    margin: 0 0 6px;
    font-size: 16px;
    font-weight: 600;
  }

  .info {
    margin: 0 0 12px;
    padding: 8px 10px;
    font-size: 12.5px;
    line-height: 1.4;
    color: #374151;
    background: #f3f4f6;
    border-radius: 8px;
  }

  .row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  label.lbl {
    display: block;
    font-weight: 600;
    font-size: 12.5px;
    margin-bottom: 4px;
  }

  .hint {
    margin: -4px 0 12px;
    font-size: 12px;
    color: #6b7280;
  }

  select,
  input[type="text"],
  input[type="number"] {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
    font-size: 13px;
    outline: none;
    color: inherit;
    margin-bottom: 12px;
  }

  input[type="text"] {
    padding-right: 34px;
    cursor: pointer;
  }

  .input-wrap {
    position: relative;
    margin-bottom: 12px;
  }

  .input-wrap input {
    margin-bottom: 0;
  }

  .distance-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .distance-row input {
    margin-bottom: 0;
  }

  .unit {
    margin-left: 8px;
    font-size: 13px;
    color: #374151;
  }

  .refresh,
  .draw-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #2563eb;
    font-size: 13px;
  }

  .refresh {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #9ca3af;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 4px;
  }

  button.run,
  button.secondary {
    border-radius: 8px;
    padding: 8px 14px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
  }

  button.run {
    background: #2563eb;
    color: #fff;
    border: none;
  }

  button.secondary {
    background: #fff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
  }

  button.run:disabled,
  button.secondary:disabled,
  .refresh:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    border-color: #e5e7eb;
  }

  .status { margin: 8px 0 0; font-size: 12.5px; }
  .status.error { color: #da1e28; }
  .status.success { color: #198038; }
  .status.loading { color: #525252; }
`;
