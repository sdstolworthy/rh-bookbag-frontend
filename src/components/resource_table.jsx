import React, { useState } from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";
import { AdditionalInfoPopup } from "./additional_info_popup";
import { useHistory } from "react-router";

const ProvisionData = ({ provisionData, onClick }) => {
  return provisionData ? (
    <div onClick={onClick}>See Data</div>
  ) : (
    <i>Not available</i>
  );
};

const ProvisionMessage = ({ messages, onClick }) => {
  if (!messages || messages?.length === 0) {
    return <i>No messages</i>;
  }
  return <div onClick={onClick}>Show Messages</div>;
};

export const ResourceTable = ({ resources }) => {
  const [popupData, setPopupData] = useState(null);
  const history = useHistory();

  function serializeResourcesToTableObject(resources) {
    const columns = [
      {
        title: "Current State",
        accessor: "current_state",
      },
      {
        title: "Governor",
        accessor: "governor",
      },
      {
        title: "Provision Messages",
        accessor: "provision_messages",
        render: (content) => {
          return (
            <ProvisionMessage
              messages={content}
              onClick={() => {
                setPopupData({
                  data: <pre>{JSON.stringify(content, null, 2)}</pre>,
                  title: "Provision Messages",
                });
              }}
            />
          );
        },
      },
      {
        title: "Provision Data",
        accessor: "provision_data",
        render: (content) => {
          return (
            <ProvisionData
              provisionData={content}
              onClick={() => {
                setPopupData({
                  data: <pre>{JSON.stringify(content, null, 2)}</pre>,
                  title: "Provision Data",
                });
              }}
            />
          );
        },
      },
    ];

    const rows = resources.map((resource, index) => {
      return {
        key: resource.id,
        original: resource,
        cells: columns.map((column) => {
          if (column.render) {
            return {
              title: column.render(resource[column.accessor]),
            };
          }
          return resource[column.accessor];
        }),
      };
    });
    return [columns, rows];
  }

  const [columns, rows] = serializeResourcesToTableObject(resources);
  return (
    <Table cells={columns} rows={rows} caption="Resources">
      <TableHeader />
      <TableBody
        // onRowClick={(_, { key }) => {
        //   history.push(`/resources/${key}`);
        // }}
        rowKey={({ rowData }) => {
          return rowData.key;
        }}
      />
      {!!popupData && (
        <AdditionalInfoPopup
          title={popupData?.title}
          content={popupData?.data}
          onClose={() => setPopupData(null)}
          isOpen={!!popupData}
        />
      )}
    </Table>
  );
};
