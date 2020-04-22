import React, { useState, useContext } from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";
import { AdditionalInfoPopup } from "./additional_info_popup";
import { PowerOffIcon, PauseCircleIcon } from "@patternfly/react-icons";
import { ResourceContext } from "../contexts/resource";
import { Link } from "react-router-dom";
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
  const resourceContext = useContext(ResourceContext);
  function serializeResourcesToTableObject(resources) {
    const columns = [
      {
        title: "Resource Name",
        accessor: "name",
      },
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
              messages={content["provision_messages"]}
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
              provisionData={content["provision_data"]}
              onClick={() => {
                setPopupData({
                  data: (
                    <pre>
                      {JSON.stringify(content["provision_data"], null, 2)}
                    </pre>
                  ),
                  title: "Provision Data",
                });
              }}
            />
          );
        },
      },
      {
        title: "Available Actions",
        accessor: "current_state",
        render: (content) => {
          const ActionIcon = () => {
            switch (content["current_state"]) {
              case "started":
                return <PauseCircleIcon color="red" />;
              case "stopped":
                return <PowerOffIcon color="green" />;
              default:
                return null;
            }
          };
          const getNewActionName = () => {
            switch (content["current_state"]) {
              case "started":
                return "stop";
              case "stopped":
                return "start";
              default:
                return null;
            }
          };
          return (
            <div
              style={{ height: 50, width: 50, cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                const action = getNewActionName();
                if (!action) {
                  return;
                }
                resourceContext.modifyResourceState(content["name"], action);
              }}
            >
              <ActionIcon />
            </div>
          );
        },
      },
      {
        title: "More Details",
        render: (content) => {
          return <Link to={`/resources/${content["name"]}`}>More Details</Link>;
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
              title: column.render(resource),
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
        rowKey={({ rowData }) => {
          return rowData.key;
        }}
        // onRowClick={(_, { original }) => {
        //   history.push(`/resources/${original["name"]}`);
        // }}
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
