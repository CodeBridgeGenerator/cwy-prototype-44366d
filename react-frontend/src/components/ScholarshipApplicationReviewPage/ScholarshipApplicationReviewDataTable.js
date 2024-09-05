import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../services/uploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../utils/DownloadCSV";

const ScholarshipApplicationReviewDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.scholarshipAppID?.scholarshipApplicationID}</p>
const dropdownTemplate1 = (rowData, { rowIndex }) => <p >{rowData.admin?.name}</p>
const inputTextareaTemplate2 = (rowData, { rowIndex }) => <p >{rowData.comments}</p>
const p_calendarTemplate3 = (rowData, { rowIndex }) => <p >{rowData.approvalDate}</p>
const tickTemplate4 = (rowData, { rowIndex }) => <i className={`pi ${rowData.approvalStatus?"pi-check": "pi-times"}`}  ></i>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.createdAt).fromNow()}</p>;
    const pUpdatedAt = (rowData, { rowIndex }) => <p>{moment(rowData.updatedAt).fromNow()}</p>;
    const pCreatedBy = (rowData, { rowIndex }) => <p>{rowData.createdBy?.name}</p>;
    const pUpdatedBy = (rowData, { rowIndex }) => <p>{rowData.updatedBy?.name}</p>;
    const paginatorLeft = <Button type="button" icon="pi pi-upload" text onClick={() => setShowUpload(true)} disabled={!false}/>;
    const paginatorRight = DownloadCSV({ data : items, fileName : "scholarshipApplicationReview"});
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <>
        <DataTable value={items} ref={dt} removableSort onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer" alwaysShowPaginator={!urlParams.singleUsersId} loading={loading}>
<Column field="scholarshipAppID" header="Scholarship Application ID" body={dropdownTemplate0} filter={selectedFilterFields.includes("scholarshipAppID")} hidden={selectedHideFields?.includes("scholarshipAppID")}  style={{ minWidth: "8rem" }} />
<Column field="admin" header="Admin" body={dropdownTemplate1} filter={selectedFilterFields.includes("admin")} hidden={selectedHideFields?.includes("admin")}  style={{ minWidth: "8rem" }} />
<Column field="comments" header="Comments" body={inputTextareaTemplate2} filter={selectedFilterFields.includes("comments")} hidden={selectedHideFields?.includes("comments")}  sortable style={{ minWidth: "8rem" }} />
<Column field="approvalDate" header="Approval Date" body={p_calendarTemplate3} filter={selectedFilterFields.includes("approvalDate")} hidden={selectedHideFields?.includes("approvalDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="approvalStatus" header="Approval Status" body={tickTemplate4} filter={selectedFilterFields.includes("approvalStatus")} hidden={selectedHideFields?.includes("approvalStatus")}  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
        <Dialog header="Upload ScholarshipApplicationReview Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService />
      </Dialog>

      <Dialog header="Search ScholarshipApplicationReview" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default ScholarshipApplicationReviewDataTable;