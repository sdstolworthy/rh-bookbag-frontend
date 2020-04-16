import React from "react";
import { Button, Modal } from "@patternfly/react-core";
export const AdditionalInfoPopup = ({ data, onClose, title, isOpen }) => {
  return (
    <React.Fragment>
      <Modal
        isSmall
        title={title}
        isOpen={isOpen}
        onClose={onClose}
        actions={[
          <Button key="confirm" variant="primary" onClick={onClose}>
            Close
          </Button>,
        ]}
        isFooterLeftAligned
      >
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Modal>
    </React.Fragment>
  );
};
