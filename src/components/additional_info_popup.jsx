import React from "react";
import { Button, Modal } from "@patternfly/react-core";
export const AdditionalInfoPopup = ({ content, onClose, title, isOpen }) => {
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
        {content}
      </Modal>
    </React.Fragment>
  );
};
