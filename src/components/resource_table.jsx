import React, { useState, useContext } from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";
import { AdditionalInfoPopup } from "./additional_info_popup";
import {
  PowerOffIcon,
  PauseCircleIcon,
  RebootingIcon,
} from "@patternfly/react-icons";
import { ResourceContext } from "../contexts/resource";
import { Link } from "react-router-dom";
import { css } from "@patternfly/react-styles";
import styles from "@patternfly/react-styles/css/components/Table/table";
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
          const d = content["deletion_time"];
          const ActionIcon = () => {
            if (content["deletion_time"]) {
              if (d.setHours(d.getHours() + 2) < new Date()) {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      resourceContext.attemptRedelete(
                        content["namespace"],
                        content["name"]
                      );
                    }}
                  >
                    <span>
                      <RebootingIcon />
                      &nbsp; Retry Delete
                    </span>
                  </div>
                );
              }
            } else if (content["current_state"]) {
              const IconWrapper = ({ children }) => (
                <div
                  style={{ height: 50, width: 50, cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const action = getNewActionName();
                    if (!action) {
                      return;
                    }
                    resourceContext.modifyResourceState(
                      content["name"],
                      action
                    );
                  }}
                >
                  {children}
                </div>
              );
              switch (content["current_state"]) {
                case "started":
                  return (
                    <IconWrapper>
                      <PauseCircleIcon color="red" />
                    </IconWrapper>
                  );
                case "stopped":
                  return (
                    <IconWrapper>
                      <PowerOffIcon color="green" />
                    </IconWrapper>
                  );
                default:
                  return null;
              }
            }
            return null;
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
          return <ActionIcon />;
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
  const RowWrapper = ({
    trRef,
    className,
    rowProps,
    row: { isExpanded, isHeightAuto, original },
    ...props
  }) => {
    const d = original?.deletion_time;
    const isDisabled = !!d && d.setHours(d.getHours() + 2) < new Date();
    return (
      <tr
        {...props}
        ref={trRef}
        className={css(
          className,
          isExpanded !== undefined && styles.tableExpandableRow,
          isExpanded && styles.modifiers.expanded,
          isHeightAuto && styles.modifiers.heightAuto
        )}
        hidden={isExpanded !== undefined && !isExpanded}
        style={isDisabled ? { color: "grey" } : {}}
      />
    );
  };

  const [columns, rows] = serializeResourcesToTableObject(resources);
  return (
    <Table
      cells={columns}
      rows={rows}
      caption="Resources"
      rowWrapper={RowWrapper}
    >
      <TableHeader />
      <TableBody
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
